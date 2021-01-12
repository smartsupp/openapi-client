import { CompileData } from '@openapi-client/compiler-types'
import { CompiledFile, Compiler } from './compiler'

export * from './compiler'

export function compile(data: CompileData.Data): CompiledFile[] {
	return new Compiler().compile(data)
}
