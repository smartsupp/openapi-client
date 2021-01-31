import { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios'

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
	) {
	}

	async request<T = any>(method: string, path: string, body?: any, query?: any, options?: any): Promise<AdapterResponse<T>> {
		try {
			return await this.axios.request({
				method: method as Method,
				url: path,
				data: body,
				params: query,
				...(options || {}),
				validateStatus: status => status < 300,
			})
		} catch (err) {
			(err as AdapterError<any>).isOpenApiError = true
			throw err
		}
	}
}
