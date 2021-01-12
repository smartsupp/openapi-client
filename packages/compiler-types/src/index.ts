export namespace CompileData {
	export type DefinitionType = 'interface' | 'enum' | 'type'

	export interface Data {
		name: string
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
		values?: any[]
	}

	export interface Property {
		name: string
		type: string | string[]
		required?: boolean
		nullable?: boolean
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
	}
}
