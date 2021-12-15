import { CompiledFile, CompileData } from '@openapi-client/compiler-types'
import { transform } from '@openapi-client/transformer'
import { TransformOptions } from '@openapi-client/transformer'
import del from 'del'
import fs from 'fs'
import isInstalled from 'is-module-installed'
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

export function generateMultiClients(specs: { [key: string]: OpenAPIV3.Document }, targets: TargetOptions[]) {
	return targets.map((target) => {
		del.sync([target.outDir + '/**'])

		const mergedCompileData: CompileData.Data = Object.entries(specs).reduce((acc: CompileData.Data, [version, spec]: [string, OpenAPIV3.Document]) => {
			const compileData = transform(spec, {...target.transformOptions, pathPrefix: `/${version}`})
			const targetVersion = {
				...target,
				outDir: `${target.outDir}/src/clients/${version}`,
				compilerOptions: {
					...target.compilerOptions,
					npmName: `${target.compilerOptions.npmName}-${version}`,
					clientClass: `${target.compilerOptions.clientClass}${ucFirst(version)}`,
				},
			}

			fs.mkdirSync(targetVersion.outDir, { recursive: true })
			writeCompiledData(compileData, targetVersion)

			mergeCompiledData(compileData, acc)
			acc.clients.push({
				name: version,
				className: targetVersion.compilerOptions.clientClass,
			})

			return acc
		}, {
			name: '',
			info: { title: '', version: '' },
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
		fs.mkdirSync(path.dirname(targetPath), { recursive: true })
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

function mergeCompiledData(from: CompileData.Data, to: CompileData.Data): CompileData.Data {
	return Object.assign(
		to,
		{
			name: from.name,
			info: from.info,
			definitions: [].concat(from.definitions, to.definitions).reduce(mergeBy(['type', 'name']), []),
			apis: [].concat(from.apis, to.apis).reduce(mergeBy(['name']), []),
		},
	)
}

function mergeBy(fields: string[]) {
	return function (acc: any[], item: { [key: string]: any }) {
		if (!acc.find((existed) => fields.every(field => existed[field] === item[field]))) {
			return acc.concat(item)
		}

		return acc
	}
}

function ucFirst(name: string): string {
	return name[0].toUpperCase() + name.substring(1)
}
