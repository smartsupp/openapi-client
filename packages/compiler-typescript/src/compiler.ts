import { CompileData } from '@openapi-client/compiler-types'
import * as fs from 'fs'
import * as Handlebars from 'handlebars'
import { pascalCase } from 'pascal-case'
import { camelCase } from 'camel-case'

const TEMPLATES_DIR = __dirname + '/../templates'

export interface CompiledFile {
	path: string
	data: string
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
			data: this.typesTemplate({
				namespace: pascalCase(data.name),
				...data,
			}),
		})
		for (const api of data.apis) {
			result.push({
				path: `apis/${this.formatFileName(api.name)}.ts`,
				data: this.apiTemplate({
					namespace: pascalCase(data.name),
					api,
					apiClass: pascalCase(api.name) + 'Client',
					apiNamespace: pascalCase(api.name),
				}),
			})
		}
		return result
	}

	formatFileName(name: string): string {
		return name[0].toLowerCase() + name.substring(1)
	}
}

// Handlebars helpers

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
	return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('pascalCase', (options) => {
	return pascalCase(options.fn(this))
})

Handlebars.registerHelper('camelCase', (options) => {
	return camelCase(options.fn(this))
})

Handlebars.registerHelper('propType', (context) => {
	return formatType(context).replace(/^#/, '')
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
		ret.push(`${param.name}: ${param.type}`)
	}
	if (context.body) {
		if (context.body.type[0] === '#') {
			ret.push(`body: ${options.data.root.namespace}.${context.body.type.slice(1)}`)
		} else {
			ret.push(`body: ${options.data.root.apiNamespace}.${context.body.type}`)
		}
	}
	if (context.query) {
		if (context.query.type[0] === '#') {
			ret.push(`query: ${options.data.root.namespace}.${context.query.type.slice(1)}`)
		} else {
			ret.push(`query: ${options.data.root.apiNamespace}.${context.query.type}`)
		}
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
		const type = formatType(context.response.type)
		if (type[0] === '#') {
			return `${options.data.root.namespace}.${type.slice(1)}`
		} else {
			return `${options.data.root.apiNamespace}.${type}`
		}
	} else {
		return 'void'
	}
})

function formatType(val: string): string {
	while (val.includes('array:')) {
		val = val.replace(/^array:(.*)$/, '$1[]')
	}
	return val
}
