import { CompiledFile } from '@openapi-client/compiler-types'
import { transform } from '@openapi-client/transformer'
import del from 'del'
import fs from 'fs'
import isInstalled from 'is-module-installed'
import { mkdirSync } from 'mkdir-recursive'
import { OpenAPIV3 } from 'openapi-types'
import path from 'path'

export type Compile = (data: any, options: any) => CompiledFile[]

export interface Options {
	outDir: string
	compilerOptions: any
}

export function generateClient(spec: OpenAPIV3.Document, name: string, options: Options): any {
	const compile: Compile = resolveCompiler(name)
	const result = compile(transform(spec), options.compilerOptions)
	if (options.outDir) {
		del.sync([options.outDir + '/**'])
		for (const item of result) {
			const targetPath = options.outDir + '/' + item.path
			mkdirSync(path.dirname(targetPath))
			fs.writeFileSync(targetPath, item.data, { flag: 'w' })
		}
	}
	return result
}

function resolveCompiler(name: string): Compile {
	const names = [
		`@openapi-client/compiler-${name}`,
		name,
	]
	for (const name of names) {
		if (isInstalled(name)) {
			return require(name).compile
		}
	}
	throw new Error(`Compiler module not found. Please install any of ${names.join(', ')}`)
}
