import { CompileData } from '@openapi-client/compiler-types'
import derefJsonSchema from 'json-schema-deref-sync'
import mergeAllOf from 'json-schema-merge-allof'
import { OpenAPIV3 } from 'openapi-types'
import { pascalCase } from 'pascal-case'

interface ApiOperation {
	path: string,
	method: string,
	operation: OpenAPIV3.OperationObject
}

export class Transformer {
	private data: CompileData.Data

	constructor(
		private spec: OpenAPIV3.Document,
	) {
	}

	toData(): CompileData.Data {
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

	transformOperation(method: string, path: string, operation: any, definitions: CompileData.Definition[]): CompileData.Operation {
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
			result.params = this.transformOperationParams(operation.parameters)
			result.query = this.transformOperationQuery(operation.operationId, operation.parameters, definitions)
		}
		if (operation.requestBody) {
			result.body = this.transformOperationBody(operation.operationId, operation.requestBody, definitions)
		}
		if (operation.responses) {
			if (operation.responses['200'] && operation.responses['200'].content) {
				result.response = this.transformOperationResponse(operation.operationId, operation.responses['200'], definitions)
			} else if (operation.responses['201'] && operation.responses['201'].content) {
				result.response = this.transformOperationResponse(operation.operationId, operation.responses['201'], definitions)
			}
		}
		return result
	}

	transformOperationParams(parameters: OpenAPIV3.ParameterObject[]): CompileData.OperationParam[] {
		const params = []
		for (const param of parameters) {
			if (param.in === 'path') {
				const schema = this.derefSchema(param.schema)
				params.push({
					name: param.name,
					type: schema.type,
					description: param.description || null,
				})
			}
		}
		return params
	}

	transformOperationQuery(operationId: string, parameters: OpenAPIV3.ParameterObject[], definitions: CompileData.Definition[]): CompileData.OperationQuery {
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
		if (Object.keys(querySchema.properties).length > 0) {
			const definition = this.transformDefinition(querySchema, pascalCase(operationId) + 'Query', definitions)
			definitions.push(definition)
			return {
				type: definition.name,
				required: querySchema.required.length > 0,
			}
		} else {
			return null
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

	transformOperationResponse(operationId: string, responseObject: OpenAPIV3.ReferenceObject | OpenAPIV3.ResponseObject, definitions: CompileData.Definition[]): CompileData.OperationResponse {
		if ((responseObject as OpenAPIV3.ReferenceObject).$ref) {
			// eslint-disable-next-line no-param-reassign
			responseObject = this.derefResponse(responseObject as OpenAPIV3.ReferenceObject)
		}
		const mediaTypeObject: OpenAPIV3.MediaTypeObject = (responseObject as OpenAPIV3.ResponseObject).content['application/json']
		if (!mediaTypeObject) {
			throw new Error(`Expected response content-type application/json, got ${Object.keys((responseObject as OpenAPIV3.ResponseObject).content)}`)
		}
		const type = this.resolveSchemaType(mediaTypeObject.schema, pascalCase(operationId) + 'Response', definitions)
		return {
			type,
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
			if ((schema as OpenAPIV3.ReferenceObject).$ref) {
				continue
			}
			const definitions: CompileData.Definition[] = []
			const definition = this.transformDefinition(schema as OpenAPIV3.SchemaObject, '', definitions)
			this.data.definitions.push(definition, ...definitions)
		}
	}

	transformDefinition(schema: OpenAPIV3.SchemaObject, name: string = '', definitions: CompileData.Definition[]): CompileData.Definition {
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

		} else if (schema.allOf) {
			const schemas = schema.allOf.map((childSchema) => {
				const schema = derefJsonSchema({
					...childSchema,
					components: { schemas: this.spec.components.schemas },
				})
				delete schema.components
				return schema
			})
			const mergedSchema = mergeAllOf(schemas, {
				resolvers: {
					example: (values) => values[0],
				},
			})
			mergedSchema.title = schema.title || mergedSchema.title
			return this.transformDefinition(mergedSchema, definition.name, definitions)

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

	transformProperty(name: string, val: any, defName: string, definitions: CompileData.Definition[]): CompileData.Property {
		if (val.$ref) {
			return this.transformPropertyFromRef(name, val)
		} else {
			return this.transformPropertyFromSchema(name, val, defName, definitions)
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
		return prop
	}

	transformType(val, defName: string, definitions: CompileData.Definition[]): string | string[] {
		if (val.$ref) {
			return this.transformTypeFromRef(val, defName)
		} else {
			return this.transformTypeFromSchema(val, defName, definitions)
		}
	}

	transformTypeFromRef(schema: OpenAPIV3.ReferenceObject, defName: string): string {
		const type = this.derefSchema(schema).title
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

	derefSchema(schema): OpenAPIV3.SchemaObject {
		return this.derefObject(schema, 'schemas') as OpenAPIV3.SchemaObject
	}

	derefResponse(response): OpenAPIV3.ResponseObject {
		return this.derefObject(response, 'responses') as OpenAPIV3.ResponseObject
	}

	derefObject(obj, from: 'schemas' | 'responses') {
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
