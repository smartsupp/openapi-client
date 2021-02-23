import { CompileData } from '@openapi-client/compiler-types'
import { OpenAPIV3 } from 'openapi-types'
import { pascalCase } from 'pascal-case'
import * as extensions from './extenstions'
import { isAllOfSchemaExtendable, mergeSchemas } from './helpers'

export interface TransformOptions {
	requestBodyRequiredPropsWithDefaults?: boolean
	requestQueryRequiredPropsWithDefaults?: boolean
}

export class Transformer {
	private data: CompileData.Data
	private options: TransformOptions
	private spec: OpenAPIV3.Document

	constructor(spec: OpenAPIV3.Document) {
		this.spec = JSON.parse(JSON.stringify(spec)) // clone spec because of internal modifications
	}

	transform(options: TransformOptions = {}): CompileData.Data {
		this.options = options
		this.data = {
			name: pascalCase(this.spec.info.title),
			info: this.spec.info,
			definitions: [],
			apis: [],
		}
		if (this.spec.components.schemas) {
			this.transformDefinitions()
		}
		this.transformApis()
		return this.data
	}

	generateApisData(spec: OpenAPIV3.Document): { [keyof: string]: ApiOperation[] } {
		const apis = {}
		for (const path in spec.paths) {
			const pathItem = spec.paths[path]
			for (const method in pathItem) {
				const operation = pathItem[method]
				for (const tag of operation.tags) {
					if (!apis[tag]) {
						apis[tag] = []
					}
					apis[tag].push({ path, method, operation })
				}
			}
		}
		return apis
	}

	transformApis() {
		const apis = this.generateApisData(this.spec)
		for (const name in apis) {
			const apiGroup: ApiOperation[] = apis[name]
			const definitions: CompileData.Definition[] = []
			this.data.apis.push({
				name: pascalCase(name),
				definitions,
				operations: apiGroup.map((op: ApiOperation) => {
					return this.transformOperation(op.method, op.path, op.operation, definitions)
				}),
			})
		}
	}

	transformOperation(method: string, path: string, operation: OpenAPIV3.OperationObject, definitions: CompileData.Definition[]): CompileData.Operation {
		const result: CompileData.Operation = {
			name: operation.operationId,
			method,
			path,
			params: [],
			query: null,
			body: null,
			response: null,
		}

		if (operation.parameters) {
			const parameters = this.derefParameters(operation.parameters)
			result.params = this.transformOperationParams(parameters, definitions)
			result.query = this.transformOperationQuery(operation.operationId, parameters, definitions)
		}

		if (operation.requestBody) {
			const requestBody = this.derefRequestBody(operation.requestBody)
			result.body = this.transformOperationBody(operation.operationId, requestBody, definitions)
		}

		if (operation.responses) {
			if (operation.responses['200'] || operation.responses['201']) {
				const response = this.derefResponse(operation.responses['200'] || operation.responses['201'])
				result.response = this.transformOperationResponse(operation.operationId, response, definitions)
			}
			if (result.response && operation.responses['404'] && operation[extensions.X_GENERATOR_RESPONSE_NULLABLE]) {
				result.response.required = false
			}
		}

		return result
	}

	transformOperationParams(parameters: OpenAPIV3.ParameterObject[], definitions: CompileData.Definition[]): CompileData.OperationParam[] {
		const result = []
		for (const param of parameters) {
			if (param.in === 'path') {
				result.push({
					name: param.name,
					type: this.transformType(param.schema, 'Param', definitions),
					description: param.description || null,
				})
			}
		}
		return result
	}

	transformOperationQuery(operationId: string, parameters: OpenAPIV3.ParameterObject[], definitions: CompileData.Definition[]): CompileData.OperationQuery | null {
		const querySchema: OpenAPIV3.SchemaObject = {
			type: 'object',
			properties: {},
			required: [],
		}
		for (const param of parameters) {
			if (param.in === 'query') {
				querySchema.properties[param.name] = param.schema
				if (param.required) {
					querySchema.required.push(param.name)
				}
				if (param.description) {
					(querySchema.properties[param.name] as OpenAPIV3.SchemaObject).description = param.description
				}
			}
		}
		if (Object.keys(querySchema.properties).length === 0) {
			return null
		}

		const definition = this.transformDefinition(querySchema, pascalCase(operationId) + 'Query', definitions)
		definitions.push(definition)
		return {
			type: definition.name,
			required: querySchema.required.length > 0,
		}
	}

	transformOperationBody(operationId: string, requestBody: OpenAPIV3.RequestBodyObject, definitions: CompileData.Definition[]): CompileData.OperationBody {
		const mediaTypeObject: OpenAPIV3.MediaTypeObject = requestBody.content['application/json']
		if (!mediaTypeObject) {
			throw new Error(`Expected request content-type application/json, got ${Object.keys(requestBody.content)}`)
		}

		const type = this.resolveSchemaType(mediaTypeObject.schema, pascalCase(operationId) + 'Body', definitions)
		return {
			type,
			required: requestBody.required,
		}
	}

	transformOperationResponse(operationId: string, response: OpenAPIV3.ResponseObject, definitions: CompileData.Definition[]): CompileData.OperationResponse | null {
		if (!response.content) {
			return null
		}

		const mediaTypeObject: OpenAPIV3.MediaTypeObject = response.content['application/json']
		if (!mediaTypeObject) {
			throw new Error(`Expected response content-type application/json, got ${Object.keys(response.content)}`)
		}

		const type = this.resolveSchemaType(mediaTypeObject.schema, pascalCase(operationId) + 'Response', definitions)
		return {
			type,
			required: true,
		}
	}

	resolveSchemaType(schema: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject, name: string, definitions: CompileData.Definition[]) {
		if ((schema as OpenAPIV3.ReferenceObject).$ref) {
			return '#' + this.derefSchema(schema).title
		} else {
			return this.transformTypeFromSchema(schema as OpenAPIV3.SchemaObject, name, definitions)
		}
	}

	transformDefinitions() {
		for (const key in this.spec.components.schemas) {
			const schema: any = this.spec.components.schemas[key]
			if (!schema.$ref) {
				schema.title = pascalCase(schema.title ? schema.title : key)
			}
		}
		for (const key in this.spec.components.schemas) {
			const schema = this.spec.components.schemas[key]
			if (!(schema as OpenAPIV3.ReferenceObject).$ref) {
				const definitions: CompileData.Definition[] = []
				const definition = this.transformDefinition(schema as OpenAPIV3.SchemaObject, '', definitions)
				if (definition) this.data.definitions.push(definition)
				this.data.definitions.push(...definitions)
			}
		}
	}

	transformDefinition(schema: OpenAPIV3.SchemaObject & SchemaObjectExtend, name: string = '', definitions: CompileData.Definition[], parentSchema?: OpenAPIV3.ReferenceObject): CompileData.Definition | null {
		if (schema._transformed) return null
		schema._transformed = true

		const definition: CompileData.Definition = {
			type: null,
			name: pascalCase(schema.title || name),
		}
		if (!definition.name) {
			throw new Error('Definition name was unable to generate. Must be passed manually')
		}

		if (schema.type === 'object') {
			definition.type = 'interface'
			definition.properties = this.transformProperties(schema, definition.name, definitions)
			if (schema.additionalProperties === true) {
				definition.additionalType = 'any'
			} else if (schema.additionalProperties) {
				definition.additionalType = this.transformType(schema.additionalProperties, definition.name + 'Props', definitions)
			}

		} else if (schema.enum) {
			definition.type = 'enum'
			definition.values = schema.enum
			if (definition.values.includes(null)) {
				definition.values.splice(definition.values.indexOf(null), 1)
			}

		} else if (schema.allOf) {
			if (isAllOfSchemaExtendable(schema)) {
				const [refSchema, ...otherSchemas] = schema.allOf
				const schemas = otherSchemas.map(this.derefSchema.bind(this))
				const mergedSchema = mergeSchemas(schemas)
				mergedSchema.title = schema.title || mergedSchema.title
				return this.transformDefinition(mergedSchema, definition.name, definitions, refSchema as OpenAPIV3.ReferenceObject)
			} else {
				const schemas = schema.allOf.map(this.derefSchema.bind(this))
				const mergedSchema = mergeSchemas(schemas)
				mergedSchema.title = schema.title || mergedSchema.title
				return this.transformDefinition(mergedSchema, definition.name, definitions)
			}

		} else if (schema.oneOf) {
			definition.type = 'type'
			definition.values = schema.oneOf.map((subSchema) => {
				return this.transformType(subSchema, definition.name, definitions)
			}).flat()

		} else if (schema.anyOf) {
			definition.type = 'type'
			definition.values = schema.anyOf.map((subSchema) => {
				return this.transformType(subSchema, definition.name, definitions)
			}).flat()

		} else if (schema.type === 'array') {
			definition.type = 'type'
			definition.values = [this.transformType(schema, definition.name + 'Item', definitions)]
		} else {
			definition.type = 'type'
			definition.values = [this.transformType(schema, definition.name, definitions)]
		}
		if (definition.values) {
			definition.values = [...new Set(definition.values)]
		}

		if (parentSchema) {
			definition.extends = this.derefSchema(parentSchema).title
		}

		if (schema.discriminator && schema.discriminator.mapping) {
			for (const prop in schema.discriminator.mapping) {
				const ref = schema.discriminator.mapping[prop]
				const refSchema = this.derefSchema({ $ref: ref })
				let refDefinition = this.data.definitions.find((def) => {
					return def.name === refSchema.title
				})
				if (!refDefinition) {
					refDefinition = this.transformDefinition(refSchema, '', definitions)
					definitions.push(refDefinition)
				}
				refDefinition.properties = refDefinition.properties.filter((prop) => {
					return prop.name !== schema.discriminator.propertyName
				})
				refDefinition.properties.unshift({
					name: schema.discriminator.propertyName,
					type: `"${prop}"`,
					required: true,
				})
			}
		}

		return definition
	}

	transformProperties(schema: OpenAPIV3.SchemaObject, defName: string, definitions: CompileData.Definition[]): CompileData.Property[] {
		const properties = []
		for (const key in schema.properties) {
			const prop = this.transformProperty(key, schema.properties[key], defName, definitions)
			if (schema.required && schema.required.includes(prop.name)) {
				prop.required = true
			}
			properties.push(prop)
		}
		return properties
	}

	transformProperty(name: string, refOrSchema: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject, defName: string, definitions: CompileData.Definition[]): CompileData.Property {
		if ((refOrSchema as OpenAPIV3.ReferenceObject).$ref) {
			return this.transformPropertyFromRef(name, refOrSchema as OpenAPIV3.ReferenceObject)
		} else {
			return this.transformPropertyFromSchema(name, refOrSchema as OpenAPIV3.SchemaObject, defName, definitions)
		}
	}

	transformPropertyFromRef(name: string, ref: OpenAPIV3.ReferenceObject): CompileData.Property {
		const schema = this.derefSchema(ref)
		const prop: CompileData.Property = {
			name,
			type: schema.title,
			required: false,
			description: schema.description || '',
		}
		if (schema.nullable) {
			prop.type = Array.isArray(prop.type) ? prop.type : [prop.type]
			if (!prop.type.includes('null')) {
				prop.type.push('null')
			}
		}
		return prop
	}

	transformPropertyFromSchema(name: string, schema: OpenAPIV3.SchemaObject, defName: string, definitions: CompileData.Definition[]): CompileData.Property {
		const prop: CompileData.Property = {
			name,
			type: this.transformType(schema, defName + pascalCase(name), definitions),
			required: false,
			description: schema.description || '',
		}
		if (schema.nullable) {
			prop.type = Array.isArray(prop.type) ? prop.type : [prop.type]
			if (!prop.type.includes('null')) {
				prop.type.push('null')
			}
		}
		if (defName && schema.hasOwnProperty('default')) {
			// When used on server defaults are filled by schema, then default values always exists and can be set as required for interface.
			if (defName.includes('Body') && this.options.requestBodyRequiredPropsWithDefaults) {
				prop.required = true
			} else if (defName.includes('Query') && this.options.requestQueryRequiredPropsWithDefaults) {
				prop.required = true
			}
		}
		return prop
	}

	transformType(schemaOrRef: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject, defName: string, definitions: CompileData.Definition[]): string | string[] {
		let type
		if ((schemaOrRef as OpenAPIV3.ReferenceObject).$ref) {
			type = this.transformTypeFromRef(schemaOrRef as OpenAPIV3.ReferenceObject, defName)
		} else {
			type = this.transformTypeFromSchema(schemaOrRef as OpenAPIV3.SchemaObject, defName, definitions)
		}
		return Array.isArray(type) ? [...new Set(type)] : type
	}

	transformTypeFromRef(ref: OpenAPIV3.ReferenceObject, defName: string): string {
		const type = this.derefSchema(ref).title
		if (defName && !type.includes(defName)) {
			return '#' + type
		} else {
			return type
		}
	}

	transformTypeFromSchema(schema: OpenAPIV3.SchemaObject, defName: string, definitions: CompileData.Definition[]): string | string[] {
		if (schema.type === 'object' || schema.enum) {
			const definition = this.transformDefinition(schema, defName, definitions)
			definitions.push(definition)
			return definition.name

		} else if (schema.type === 'array') {
			const type = this.transformType(schema.items, defName, definitions)
			if (Array.isArray(type)) {
				return type.map(t => `array:${t}`)
			} else {
				return `array:${type}`
			}

		} else if (schema.type) {
			return schema.type

		} else if (schema.allOf) {
			if (schema.allOf.length === 1 && (schema.allOf[0] as OpenAPIV3.ReferenceObject).$ref) {
				return this.derefSchema(schema.allOf[0] as OpenAPIV3.ReferenceObject).title
			} else {
				const definition = this.transformDefinition(schema, defName, definitions)
				definitions.push(definition)
				return definition.name
			}

		} else if (schema.anyOf) {
			return schema.anyOf.map((subSchema) => {
				return this.transformType(subSchema, defName, definitions)
			}).flat()

		} else if (schema.oneOf) {
			return schema.oneOf.map((subSchema) => {
				return this.transformType(subSchema, defName, definitions)
			}).flat()

		} else if (schema.nullable) {
			return 'null'

		} else {
			throw new Error(`Unable to process parameter in ${defName}. Schema not supported`)
		}
	}

	derefParameters(params: (OpenAPIV3.ReferenceObject | OpenAPIV3.ParameterObject)[]): OpenAPIV3.ParameterObject[] {
		return params.map(this.derefParameter.bind(this))
	}

	derefParameter(paramOrRef: OpenAPIV3.ParameterObject | OpenAPIV3.ReferenceObject): OpenAPIV3.ParameterObject {
		return this.derefObject(paramOrRef, 'parameters') as OpenAPIV3.ParameterObject
	}

	derefSchema(schemaOrRef: OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject): OpenAPIV3.SchemaObject {
		return this.derefObject(schemaOrRef, 'schemas') as OpenAPIV3.SchemaObject
	}

	derefResponse(responseOrRef: OpenAPIV3.ResponseObject | OpenAPIV3.ReferenceObject): OpenAPIV3.ResponseObject {
		return this.derefObject(responseOrRef, 'responses') as OpenAPIV3.ResponseObject
	}

	derefRequestBody(requestBodyOrRef: OpenAPIV3.RequestBodyObject | OpenAPIV3.ReferenceObject): OpenAPIV3.RequestBodyObject {
		return this.derefObject(requestBodyOrRef, 'requestBodies') as OpenAPIV3.RequestBodyObject
	}

	derefObject(obj, from: 'schemas' | 'responses' | 'parameters' | 'requestBodies') {
		if (!obj.$ref) {
			return obj
		}
		const name = obj.$ref.replace(`#/components/${from}/`, '')
		if (!this.spec.components[from][name]) {
			throw new Error(`Missing ${name} in #/components/${from}/`)
		}
		return this.spec.components[from][name]
	}
}

interface ApiOperation {
	path: string,
	method: string,
	operation: OpenAPIV3.OperationObject
}

interface SchemaObjectExtend {
	_transformed?: boolean
}
