import type { IAdapter, AdapterResponse, AdapterError } from '@openapi-client/adapter-types'
import qs, { ParsedUrlQueryInput } from 'querystring'

interface FetchOptions extends RequestInit {
	baseURL?: string
}

export class FetchAdapter implements IAdapter<FetchOptions> {
	private options: FetchOptions = {}

	constructor(options: FetchOptions) {
		this.options = options
	}

	async request<T = unknown>(method: string, path: string, body: unknown, query: ParsedUrlQueryInput, options: FetchOptions): Promise<AdapterResponse<T>> {
		const mergeOptions = { ...this.options, ...options }
		const queryString = query
			? '?' + qs.stringify(query)
			: ''

		try {
			const response = await fetch(`${mergeOptions.baseURL || ''}${path}${queryString}`, {
				method,
				body: body ? JSON.stringify(body) : null,
				...mergeOptions,
			})
			return {
				status: response.status,
				statusText: response.statusText,
				data: await response.json() as T,
				headers: [ ...response.headers.entries() ].reduce((acc, [k, v]) => {
					acc[k] = v
					return acc
				}, {} as Record<string, string>),
			}
		} catch (err) {
			(err as AdapterError<any>).isOpenApiError = true
			throw err
		}
	}

	withOptions(options: FetchOptions) {
		return new FetchAdapter(options)
	}
}
