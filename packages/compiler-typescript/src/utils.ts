import prettier from 'prettier'

const PrettierOptions = {
	parser: 'typescript',
	singleQuote: true,
	printWidth: 200,
	useTabs: true,
}

interface FormatTypeContext {
	namespace: string
	apiNamespace: string
}

export function pretify(output: string): string {
	return prettier.format(output, PrettierOptions)
		.replace(/^\s*\n/gm, '')
		.replace(/^(\t*export\s(namespace|interface|class)(.*))$/gm, '\n$1')
}

export function expandType(type: string | string[], data?: FormatTypeContext): string {
	const types = Array.isArray(type) ? type : [type]
	return types.map((type) => {
		type = expandTypeArray(type)
		if (data && !isTypeNatural(type.replace(/\[\]/g, ''))) {
			return expandTypeNamespace(type, data)
		} else {
			return expandTypeSimple(type)
		}
	}).join(' | ')
}

export function expandTypeArray(type: string): string {
	while (type.includes('array:')) {
		type = type.replace(/^array:(.*)$/, '$1[]')
	}
	return type
}

export function expandTypeNamespace(type: string, data: FormatTypeContext): string {
	if (type[0] === '#') {
		return `${data.namespace}.${type.slice(1)}`
	} else {
		return `${data.apiNamespace}.${type}`
	}
}

export function expandTypeSimple(type: string): string {
	return type[0] === '#' ? type.slice(1) : type
}

export function isTypeNatural(type: string): boolean {
	return ['string', 'boolean', 'number', 'any', 'null'].includes(type)
}

export function lcFirst(name: string): string {
	return name[0].toLowerCase() + name.substring(1)
}
