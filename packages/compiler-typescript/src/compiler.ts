import { CompileData } from '@openapi-client/compiler-types'
import { camelCase } from 'camel-case'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import { pascalCase } from 'pascal-case'
import prettier from "prettier"

const TEMPLATES_DIR = __dirname + '/../templates'

const PrettierOptions = {
	parser: 'typescript',
	singleQuote: true,
	printWidth: 200,
	useTabs: true,
}

export interface CompiledFile {
	path: string
	data: string
}

interface FormatTypeContext {
	namespace: string
	apiNamespace: string
}

export class Compiler {
	private readonly apiTemplate: Handlebars.TemplateDelegate
	private readonly typesTemplate: Handlebars.TemplateDelegate

	constructor() {
		this.apiTemplate = Handlebars.compile(this.getTemplate('api'))
		this.typesTemplate = Handlebars.compile(this.getTemplate('types'))
	}

	getTemplate(name: string): string {
		return fs.readFileSync(`${TEMPLATES_DIR}/${name}.hbs`).toString()
	}

	compile(data: CompileData.Data): CompiledFile[] {
		const result = []
		result.push({
			path: 'types.ts',
			data: this.pretify(this.typesTemplate({
				namespace: pascalCase(data.name),
				...data,
			})),
		})
		for (const api of data.apis) {
			result.push({
				path: `apis/${this.formatFileName(api.name)}.ts`,
				data: this.pretify(this.apiTemplate({
					namespace: pascalCase(data.name),
					api,
					apiClass: pascalCase(api.name) + 'Client',
					apiNamespace: pascalCase(api.name),
				})),
			})
		}
		return result
	}

	formatFileName(name: string): string {
		return name[0].toLowerCase() + name.substring(1)
	}

	pretify(output: string): string {
		return prettier.format(output, PrettierOptions)
			.replace(/^\s*\n/gm, '')
			.replace(/^(\t*export\s(namespace|interface|class)(.*))$/gm, "\n$1")
	}
}

// Handlebars helpers

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
	return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
})

Handlebars.registerHelper('pascalCase', (options) => {
	return pascalCase(options.fn(this))
})

Handlebars.registerHelper('camelCase', (options) => {
	return camelCase(options.fn(this))
})

Handlebars.registerHelper('propType', (context) => {
	return expandType(context)
})

Handlebars.registerHelper('enumName', (context: string) => {
	let enumName = pascalCase(`${context}`)
	if (enumName.match(/^[0-9].*/)) {
		enumName = '_' + enumName
	}
	return enumName
})

Handlebars.registerHelper('opParams', (context: CompileData.Operation, options) => {
	const ret = []
	for (const param of context.params) {
		ret.push(`${param.name}: ${expandType(param.type, options.data.root)}`)
	}
	if (context.body) {
		ret.push(`body: ${expandType(context.body.type, options.data.root)}`)
	}
	if (context.query) {
		ret.push(`query: ${expandType(context.query.type, options.data.root)}`)
	}
	ret.push('options?')
	return ret.join(', ')
})

Handlebars.registerHelper('opArgs', (context: CompileData.Operation) => {
	return [
		`'${context.method}'`,
		`\`${context.path.replace(/\{/g, '${')}\``,
		context.body ? 'body' : 'null',
		context.query ? 'query' : 'null',
		'options',
	].join(', ')
})

Handlebars.registerHelper('opResponse', (context: CompileData.Operation, options) => {
	if (context.response) {
		return expandType(context.response.type, options.data.root)
	} else {
		return 'void'
	}
})

function expandType(type: string | string[], data?: FormatTypeContext): string {
	const types = Array.isArray(type) ? type : [type]
	return types.map((type) => {
		type = expandTypeArray(type)
		if (data && !isTypeNatural(type)) {
			return expandTypeNamespace(type, data)
		} else {
			return expandTypeSimple(type)
		}
	}).join(' | ')
}

function expandTypeArray(type: string): string {
	while (type.includes('array:')) {
		type = type.replace(/^array:(.*)$/, '$1[]')
	}
	return type
}

function expandTypeNamespace(type: string, data: FormatTypeContext): string {
	if (type[0] === '#') {
		return `${data.namespace}.${type.slice(1)}`
	} else {
		return `${data.apiNamespace}.${type}`
	}
}

function expandTypeSimple(type: string): string {
	return type[0] === '#' ? type.slice(1) : type
}

function isTypeNatural(type: string): boolean {
	return ['string', 'boolean', 'number', 'any', 'null'].includes(type)
}
