import type { IAdapter, AdapterResponse, AdapterError } from '@openapi-client/adapter-types'
import { AxiosInstance, AxiosRequestConfig, Method } from 'axios'

export class AxiosAdapter implements IAdapter<AxiosRequestConfig> {
	constructor(
		public axios: AxiosInstance,
		public options: AxiosRequestConfig = {},
	) {
	}

	withOptions(options: AxiosRequestConfig): AxiosAdapter {
		return new AxiosAdapter(this.axios, this.createOptions(options))
	}

	createOptions(options: AxiosRequestConfig): AxiosRequestConfig {
		return Object.assign({}, this.options, options, {
			headers: Object.assign({}, this.options.headers || {}, options.headers || {}),
		})
	}

	async request<T = any>(method: string, path: string, body: unknown, query: Record<string, string>, options: AxiosRequestConfig): Promise<AdapterResponse<T>> {
		try {
			return await this.axios.request({
				method: method as Method,
				url: path,
				data: body,
				params: query,
				validateStatus: status => status < 300,
				...this.createOptions(options || {}),
			})
		} catch (err) {
			(err as AdapterError<any>).isOpenApiError = true
			throw err
		}
	}
}
