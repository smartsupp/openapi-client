import { OpenAPIV3 } from 'openapi-types'

export interface CompiledFile {
	path: string
	data: string
}

export namespace CompileData {
	export type DefinitionType = 'interface' | 'enum' | 'type'

	export interface Data {
		name: string
		info: OpenAPIV3.InfoObject
		definitions: Definition[]
		apis: Api[]
	}

	export interface Api {
		name: string
		definitions: Definition[]
		operations: Operation[]
	}

	export interface Definition {
		type: DefinitionType
		name: string
		properties?: Property[]
		additionalType?: string | string[]
		extends?: string
		values?: any[]
	}

	export interface Property {
		name: string
		type: string | string[]
		required?: boolean
		description?: string
	}

	export interface Operation {
		params: OperationParam[]
		name: string
		method: string
		path: string
		query: OperationQuery | null
		body: OperationBody | null
		response: OperationResponse | null
	}

	export interface OperationParam {
		name: string
		type: string | string[]
		description?: string
	}

	export interface OperationBody {
		type: string | string[]
		required?: boolean
	}

	export interface OperationQuery {
		type: string | string[]
		required?: boolean
	}

	export interface OperationResponse {
		type: string | string[]
		required?: boolean
	}
}
