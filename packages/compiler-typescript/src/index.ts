import { CompileData, CompiledFile } from '@openapi-client/compiler-types'
import { Compiler, CompilerOptions } from './compiler'

export * from './compiler'

export function compile(data: CompileData.Data, options: CompilerOptions): CompiledFile[] {
	return new Compiler().compile(data, options)
}
