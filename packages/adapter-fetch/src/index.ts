import type { IAdapter, AdapterOptions, AdapterResponse, AdapterError } from '@openapi-client/adapter-types'

export class FetchAdapter implements IAdapter {
	private options: AdapterOptions = {}

	constructor(options: AdapterOptions) {
		this.options = options
	}

	async request<T = unknown>(method: string, path: string, body: unknown, query: Record<string, string>, options: AdapterOptions): Promise<AdapterResponse<T>> {
		const mergeOptions = { ...this.options, ...options }
		const queryString = query
			? '?' + Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')
			: ''

		try {
			const response = await fetch(`${mergeOptions.baseURL || ''}${path}${queryString}`, {
				method,
				body: body ? JSON.stringify(body) : undefined,
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

	withOptions(options: AdapterOptions) {
		return new FetchAdapter(options)
	}
}
