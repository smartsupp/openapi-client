import { CompileData } from '@openapi-client/compiler-types'
import { OpenAPIV3 } from 'openapi-types'
import { Transformer } from './transformer'

export * from './transformer'

export function transform(spec: OpenAPIV3.Document): CompileData.Data {
	return new Transformer(spec).toData()
}
