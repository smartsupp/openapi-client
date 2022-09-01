import { CompileData } from '@openapi-client/compiler-types'
import { OpenAPIV3 } from 'openapi-types'
import { Transformer, TransformOptions } from './transformer'

export * from './transformer'

export function transform(spec: OpenAPIV3.Document, options: TransformOptions = {}): CompileData.Data {
	return new Transformer(spec).transform(options)
}

declare global {
	namespace OpenAPIV3 {
		interface SchemaObject {
			'x-namespace': string
			'x-generator-namespace': string
			'x-generator-type': string
		}
		interface BaseSchemaObject {
			'x-enum-names': string[]
		}
		interface OperationObject {
			'x-generator-response-nullable': string
		}
	}
}
