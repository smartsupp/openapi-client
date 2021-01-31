import prettier from 'prettier'

const ParserOptions: { [keyof: string]: prettier.Options } = {
	typescript: {
		parser: 'typescript',
		semi: false,
		singleQuote: true,
		printWidth: 200,
		useTabs: true,
	},
}

interface FormatTypeContext {
	namespace: string
}

export function pretify(output: string, parser: prettier.BuiltInParserName): string {
	const options = {
		...ParserOptions[parser] || {},
		parser,
	}
	return prettier.format(output, options)
		.replace(/\n\n\n+/gm, '\n\n') // remove multiple new lines
}

export function expandType(type: string | string[], data?: FormatTypeContext): string {
	const types = Array.isArray(type) ? type : [type]
	return types.map((type) => {
		// eslint-disable-next-line no-param-reassign
		type = formatTypeToTypescript(type)
		if (data && !isTypeNatural(type.replace(/\[\]/g, ''))) {
			return formatTypeNamespace(type, data)
		} else {
			return formatTypeSimple(type)
		}
	}).join(' | ')
}

/**
 * Convert to typescript type eg "string" => "string" or "array:array:string" => "string[][]"
 * @param type Must be in format (array:)*TYPE
 */
export function formatTypeToTypescript(type: string): string {
	const typeParts = type.split(':').reverse()
	return typeParts.reduce((res: string, type: string) => {
		if (type === 'array') {
			return res + '[]'
		} else {
			if (type === 'integer') {
				return 'number'
			} else {
				return type
			}
		}
	}, '')
}

export function formatTypeNamespace(type: string, data: FormatTypeContext): string {
	if (type[0] === '#') {
		return `types.${type.slice(1)}`
	} else {
		return `types.${data.namespace}.${type}`
	}
}

export function formatTypeSimple(type: string): string {
	return type[0] === '#' ? type.slice(1) : type
}

export function isTypeNatural(type: string): boolean {
	return ['string', 'boolean', 'number', 'any', 'null'].includes(type)
}

export function lcFirst(name: string): string {
	return name[0].toLowerCase() + name.substring(1)
}
