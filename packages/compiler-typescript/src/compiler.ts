import { CompileData, CompiledFile } from '@openapi-client/compiler-types'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import { pascalCase } from 'pascal-case'
import prettier from 'prettier'
import helpers from './helpers'
import { lcFirst, pretify } from './utils'
import { DEFAULT_API_NAME, DEFAULT_TS_TARGET } from './constants'

const TEMPLATES_DIR = __dirname + '/../templates'

export interface CompilerOptions {
	npmName?: string
	npmAuthor?: string
	npmVersion?: string
	npmLicense?: string
	npmHomepage?: string
	npmRepository?: string
	npmPublishConfig?: any
	tsTarget?: string
	clientClass?: string
	// default false
	nativeEnum?: boolean
	exportPaths?: boolean
}

for (const name in helpers) {
	Handlebars.registerHelper(name, helpers[name])
}

export class Compiler {
	private templates: Map<string, Handlebars.TemplateDelegate> = new Map()

	constructor() {
	}

	getTemplate(name: string): Handlebars.TemplateDelegate {
		if (!this.templates.has(name)) {
			const template = Handlebars.compile(loadTemplate(name))
			this.templates.set(name, template)
		}
		return this.templates.get(name)
	}

	compile(data: CompileData.Data, options: CompilerOptions = {}): CompiledFile[] {
		const result: CompiledFile[] = []
		result.push({
			path: 'src/types.ts',
			data: this.compileTypes(data, options),
		})
		for (const api of data.apis) {
			if (api.name.toLowerCase() !== DEFAULT_API_NAME) {
				result.push({
					path: `src/apis/${lcFirst(api.name)}.ts`,
					data: this.compileApi(data, api),
				})
			}
		}
		result.push({
			path: 'src/client.ts',
			data: this.compileClient(data, options),
		})
		result.push({
			path: 'src/index.ts',
			data: this.compileIndex(data, options),
		})
		result.push({
			path: 'package.json',
			data: this.compilePackage(data, options),
		})
		result.push({
			path: '.npmignore',
			data: this.compileNpmignore(),
		})
		result.push({
			path: 'tsconfig.json',
			data: this.compileTsconfig(options),
		})
		result.push({
			path: 'README.md',
			data: this.compileReadme(data, options),
		})
		return result
	}

	compileTypes(data: CompileData.Data, options: CompilerOptions = {}): string {
		return renderTemplate(this.getTemplate('types'), {
			nativeEnum: options.nativeEnum || false,
			apis: data.apis,
			clients: data.clients || [],
			definitions: getDefinitions(data.definitions),
			namespaces: getNamespaces(data.definitions),
			methods: getMethods(data.apis),
			exportPaths: options.exportPaths || false,
		}, 'typescript')
	}

	compileApi(data: CompileData.Data, api: CompileData.Api): string {
		return renderTemplate(this.getTemplate('api'), {
			api,
			className: pascalCase(api.name) + 'Client',
			namespace: pascalCase(api.name) + 'Api',
		}, 'typescript')
	}

	compileClient(data: CompileData.Data, options: CompilerOptions = {}): string {
		return renderTemplate(this.getTemplate('client'), {
			clientClassName: options.clientClass || 'Client',
			namespace: 'DefaultApi',
			defaultApi: data.apis.find((api: CompileData.Api) => {
				return api.name.toLowerCase() === DEFAULT_API_NAME
			}),
			apis: data.apis.filter((api: CompileData.Api) => {
				return api.name.toLowerCase() !== DEFAULT_API_NAME
			}).map((api: CompileData.Api) => ({
				name: lcFirst(api.name),
				className: pascalCase(api.name) + 'Client',
			})),
			clients: data.clients || [],
		}, 'typescript')
	}

	compileIndex(data: CompileData.Data, options: CompilerOptions = {}): string {
		return renderTemplate(this.getTemplate('index'), {
			clientClassName: options.clientClass || 'Client',
			apis: data.apis.filter((api: CompileData.Api) => {
				return api.name.toLowerCase() !== DEFAULT_API_NAME
			}).map((api: CompileData.Api) => ({
				name: lcFirst(api.name),
				className: pascalCase(api.name) + 'Client',
			})),
			clients: data.clients || [],
		}, 'typescript')
	}

	compilePackage(data: CompileData.Data, options: CompilerOptions = {}): string {
		return renderTemplate(this.getTemplate('package'), {
			name: options.npmName || 'openapi',
			author: options.npmAuthor,
			homepage: options.npmHomepage,
			repository: options.npmRepository,
			version: options.npmVersion || data.info.version,
			license: options.npmLicense || data.info.license?.name || '',
			publishConfig: options.npmPublishConfig,
		}, 'json')
			.replace(/\n\n+/gm, '\n') // remove multiple new lines
	}

	compileNpmignore(): string {
		return renderTemplate(this.getTemplate('npmignore'))
	}

	compileTsconfig(options: CompilerOptions = {}): string {
		return renderTemplate(this.getTemplate('tsconfig'), {
			target: options.tsTarget || DEFAULT_TS_TARGET,
		})
	}

	compileReadme(data: CompileData.Data, options: CompilerOptions = {}): string {
		return renderTemplate(this.getTemplate('readme'), {
			name: options.npmName || 'openapi',
			description: data.info.description,
			clientClassName: options.clientClass || 'Client',
		}).replace(/\n\n\n+/gm, '\n\n')
	}
}

function loadTemplate(name: string): string {
	return fs.readFileSync(`${TEMPLATES_DIR}/${name}.hbs`).toString()
}

function renderTemplate(renderer: Handlebars.TemplateDelegate, data: any = {}, pretifyName?: prettier.BuiltInParserName): string {
	const output = renderer(data)
	return pretifyName ? pretify(output, pretifyName) : output
}

function getNamespaces(definitions: CompileData.Definition[]) {
	const namespaces: Record<string, CompileData.Definition[]> = {}
	for (const definition of definitions) {
		if (definition.name.includes('.')) {
			const [namespace, name] = definition.name.split('.', 2)
			if (!namespaces[namespace]) namespaces[namespace] = []
			namespaces[namespace].push({
				...definition,
				name: name,
			})
		}
	}
	return Object.keys(namespaces).map((key) => ({
		name: key,
		definitions: namespaces[key],
	}))
}

function getDefinitions(definitions: CompileData.Definition[]): CompileData.Definition[] {
	return definitions.filter((definition) => {
		return !definition.name.includes('.')
	})
}

function getMethods(apis: CompileData.Api[]) {
	return [...apis.reduce((acc, api) => {
		api.operations.forEach(operation => acc.add(operation.method))
		return acc
	}, new Set())]
}
