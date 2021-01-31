import { OpenAPIV3 } from 'openapi-types'
import mergeAllOf from 'json-schema-merge-allof'

export function mergeSchemas(schemas: OpenAPIV3.SchemaObject[]): OpenAPIV3.SchemaObject {
	return mergeAllOf(schemas, {
		resolvers: {
			example: (values) => values[0],
		},
	})
}

export function isAllOfSchemaExtendable(schema: OpenAPIV3.SchemaObject): boolean {
	// must be at least 2 items
	if (schema.allOf.length < 1) {
		return false
	}
	// first must reference
	if (!(schema.allOf[0] as OpenAPIV3.ReferenceObject).$ref) {
		return false
	}
	// others schemas must not require properties that not included in properties
	for (let i = 1; i < schema.allOf.length; i++) {
		if (!(schema.allOf[i] as OpenAPIV3.ReferenceObject).$ref) {
			const childSchema: OpenAPIV3.SchemaObject = schema.allOf[i] as OpenAPIV3.SchemaObject
			if (childSchema.required) {
				for (const prop of childSchema.required) {
					if (!childSchema.properties[prop]) {
						return false
					}
				}
			}
		}
	}
	return true
}
