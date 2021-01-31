import { CompiledFile } from '@openapi-client/compiler-types'
import { transform } from '@openapi-client/transformer'
import { TransformOptions } from '@openapi-client/transformer'
import del from 'del'
import fs from 'fs'
import isInstalled from 'is-module-installed'
import { mkdirSync } from 'mkdir-recursive'
import { OpenAPIV3 } from 'openapi-types'
import path from 'path'

export type Compile = (data: any, options: any) => CompiledFile[]

export interface TargetOptions {
	name: string
	outDir: string
	compilerOptions?: any
	transformOptions?: TransformOptions
}

export function generateClients(spec: OpenAPIV3.Document, targets: TargetOptions[]): CompiledFile[][] {
	return targets.map((target) => {
		return generateClient(spec, target)
	})
}

function generateClient(spec: OpenAPIV3.Document, target: TargetOptions): CompiledFile[] {
	const compileData = transform(spec, target.transformOptions)
	const compile: Compile = resolveCompiler(target.name)
	const result = compile(compileData, target.compilerOptions)

	del.sync([target.outDir + '/**'])
	for (const item of result) {
		const targetPath = target.outDir + '/' + item.path
		mkdirSync(path.dirname(targetPath))
		fs.writeFileSync(targetPath, item.data, { flag: 'w' })
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
			const compilerModule = require(name)
			if (!compilerModule.compile) {
				throw new Error(`Module ${name} was found, but is not compatible. Missing compile function.`)
			}
			return require(name).compile
		}
	}
	throw new Error(`Compiler module not found. Please install any of ${names.join(', ')}.`)
}
