import { CompileData } from '@openapi-client/compiler-types'
import { camelCase } from 'camel-case'
import { pascalCase } from 'pascal-case'
import { expandType } from './utils'

export default {
	ifEquals: (arg1, arg2, options) => {
		return arg1 === arg2 ? options.fn(this) : options.inverse(this)
	},

	json: (data: any) => {
		return JSON.stringify(data, null, 2)
	},

	pascalCase: (options) => {
		return pascalCase(options.fn(this))
	},

	camelCase: (options) => {
		return camelCase(options.fn(this))
	},

	upperCase: (options) => {
		const value: string = options.fn(this)
		return value.toUpperCase()
	},

	propType: (context: string | string[]) => {
		return expandType(context)
	},

	enumName: (context: CompileData.Enum) => {
		if (context.name) {
			return context.name
		}
		let enumName = `${context.value}`
		if (enumName.toUpperCase() !== enumName) {
			enumName = pascalCase(`${context.value}`)
		}
		if (enumName.match(/^[0-9].*/)) {
			enumName = '_' + enumName
		}
		return enumName
	},

	enumValue: (context: CompileData.Enum) => {
		if (typeof context.value === 'string') {
			return `'${context.value}'`
		} else {
			return context.value
		}
	},

	opParams: (context: CompileData.Operation, options) => {
		const ret = []
		for (const param of context.params) {
			ret.push(`${param.name}: ${expandType(param.type, options.data.root)}`)
		}
		if (context.body) {
			ret.push(`body${context.body.required ? '' : '?'}: ${expandType(context.body.type, options.data.root)}`)
		}
		if (context.query) {
			ret.push(`query${context.query.required ? '' : '?'}: ${expandType(context.query.type, options.data.root)}`)
		}
		ret.push('options?: O')
		return ret.join(', ')
	},

	opArgs: (context: CompileData.Operation) => {
		return [
			`'${context.method}'`,
			`\`${context.path.replace(/{/g, '${')}\``,
			context.body ? 'body' : 'null',
			context.query ? 'query' : 'null',
			'options',
		].join(', ')
	},

	opResponse: (context: CompileData.Operation, options) => {
		if (context.response) {
			return `${expandType(context.response.type, options.data.root)}${context.response.required ? '' : ' | null'}`
		} else {
			return 'void'
		}
	},

	opResponseRaw: (context: CompileData.Operation, options) => {
		if (context.response) {
			return `${expandType(context.response.type, options.data.root)}`
		} else {
			return 'void'
		}
	},
}


