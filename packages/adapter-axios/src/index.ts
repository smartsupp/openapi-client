import type { IAdapter, AdapterResponse, AdapterError, AdapterOptions } from '@openapi-client/adapter-types'
import { AxiosInstance, AxiosRequestConfig, Method } from 'axios'

export interface AxiosAdapterOptions extends AdapterOptions, AxiosRequestConfig {}

export class AxiosAdapter implements IAdapter {
	constructor(
		public axios: AxiosInstance,
		public options: AxiosAdapterOptions = {},
	) {
	}

	withOptions(options: AxiosAdapterOptions): AxiosAdapter {
		return new AxiosAdapter(this.axios, this.createOptions(options))
	}

	createOptions(options: AxiosAdapterOptions): AxiosAdapterOptions {
		return Object.assign({}, this.options, options, {
			headers: Object.assign({}, this.options.headers || {}, options.headers || {}),
		})
	}

	async request<T = any>(method: string, path: string, body: unknown, query: Record<string, string>, options: AxiosAdapterOptions): Promise<AdapterResponse<T>> {
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
