import { CompiledFile, CompileData } from '@openapi-client/compiler-types'
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
		del.sync([target.outDir + '/**'])
		const compileData = transform(spec, target.transformOptions)
		return writeCompiledData(compileData, target)
	})
}

export function generateMultiClient(specs: { [key: string]: OpenAPIV3.Document }, targets: TargetOptions[]) {
	return targets.map((target) => {
		del.sync([target.outDir + '/**'])

		const mergedCompileData: CompileData.Data = Object.entries(specs).reduce((acc: any, [version, spec]) => {
			const compileData = transform(spec, target.transformOptions)
			const targetVersion = {
				...target,
				outDir: `${target.outDir}/src/clients/${version}`,
				compilerOptions: {
					...target.compilerOptions,
					npmName: `${target.compilerOptions.npmName}-${version}`,
					clientClass: `${target.compilerOptions.clientClass}${ucFirst(version)}`,
				},
			}

			mkdirSync(targetVersion.outDir)
			writeCompiledData(compileData, targetVersion)

			acc.name = compileData.name
			acc.info = compileData.info
			acc.definitions = [].concat(compileData.definitions, acc.definitions).reduce((acc: CompileData.Definition[], definition) => {
				if (!acc.find(item => item.name === definition.name)) {
					acc.push(definition)
				}

				return acc
			}, [])

			acc.apis = [].concat(compileData.apis, acc.apis).reduce((acc: CompileData.Api[], api) => {
				if (!acc.find(item => item.name === api.name)) {
					acc.push(api)
				}

				return acc
			}, [])

			acc.clients.push({
				version: version,
				className: targetVersion.compilerOptions.clientClass,
			})

			return acc
		}, {
			name: null,
			info: {},
			definitions: [],
			apis: [],
			clients: [],
		})

		return writeCompiledData(mergedCompileData, target)
	})
}

function writeCompiledData(compileData: CompileData.Data, target: TargetOptions) {
	const compile: Compile = resolveCompiler(target.name)
	const result = compile(compileData, target.compilerOptions)

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

function ucFirst(name: string): string {
	return name[0].toUpperCase() + name.substring(1)
}
