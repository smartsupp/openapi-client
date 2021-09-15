import { AxiosError, AxiosInstance, AxiosResponse, Method, AxiosRequestConfig } from 'axios'

export interface AdapterResponse<T> extends AxiosResponse<T> {
	status: number
	statusText: string
	data: T
	headers: Record<string, string>
}

export interface AdapterError<T> extends AxiosError<T> {
	code?: string
	response?: AdapterResponse<T>
	isOpenApiError: boolean
}

export class AxiosAdapter {
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

	async request<T = any>(method: string, path: string, body?: any, query?: any, options?: AxiosRequestConfig): Promise<AdapterResponse<T>> {
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
