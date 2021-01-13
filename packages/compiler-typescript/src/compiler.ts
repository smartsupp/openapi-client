import { CompileData } from '@openapi-client/compiler-types'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import { pascalCase } from 'pascal-case'
import helpers from './helpers'
import { lcFirst, pretify } from './utils'

const TEMPLATES_DIR = __dirname + '/../templates'

export interface CompiledFile {
	path: string
	data: string
}

for (const name in helpers) {
	Handlebars.registerHelper(name, helpers[name])
}

export class Compiler {
	private readonly apiTemplate: Handlebars.TemplateDelegate
	private readonly typesTemplate: Handlebars.TemplateDelegate
	private readonly clientTemplate: Handlebars.TemplateDelegate
	private readonly indexTemplate: Handlebars.TemplateDelegate

	constructor() {
		this.apiTemplate = Handlebars.compile(this.getTemplate('api'))
		this.typesTemplate = Handlebars.compile(this.getTemplate('types'))
		this.clientTemplate = Handlebars.compile(this.getTemplate('client'))
		this.indexTemplate = Handlebars.compile(this.getTemplate('index'))
	}

	getTemplate(name: string): string {
		return fs.readFileSync(`${TEMPLATES_DIR}/${name}.hbs`).toString()
	}

	compile(data: CompileData.Data): CompiledFile[] {
		const result = []
		result.push(this.compileTypes(data))
		for (const api of data.apis) {
			result.push(this.compileApi(data, api))
		}
		result.push(this.compileClient(data))
		result.push(this.compileIndex(data))
		return result
	}

	compileTypes(data: CompileData.Data): CompiledFile {
		return {
			path: 'types.ts',
			data: pretify(this.typesTemplate({
				namespace: pascalCase(data.name),
				...data,
			})),
		}
	}

	compileApi(data: CompileData.Data, api: CompileData.Api): CompiledFile {
		return {
			path: `apis/${lcFirst(api.name)}.ts`,
			data: pretify(this.apiTemplate({
				namespace: pascalCase(data.name),
				api,
				apiClass: pascalCase(api.name) + 'Client',
				apiNamespace: pascalCase(api.name),
			})),
		}
	}

	compileClient(data: CompileData.Data): CompiledFile {
		return {
			path: 'client.ts',
			data: pretify(this.clientTemplate({
				apis: data.apis.map((api: CompileData.Api) => ({
					name: lcFirst(api.name),
					className: pascalCase(api.name) + 'Client',
				})),
			})),
		}
	}

	compileIndex(data: CompileData.Data): CompiledFile {
		return {
			path: 'index.ts',
			data: pretify(this.indexTemplate({
				apis: data.apis.map((api: CompileData.Api) => ({
					name: lcFirst(api.name),
					className: pascalCase(api.name) + 'Client',
				})),
			})),
		}
	}
}
