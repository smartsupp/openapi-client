import { CompileData } from '@openapi-client/compiler-types'
import { OpenAPIV3 } from 'openapi-types'
import { Transformer, TransformOptions } from './transformer'

export * from './transformer'

export function transform(spec: OpenAPIV3.Document, options: TransformOptions = {}): CompileData.Data {
	return new Transformer(spec).transform(options)
}
