export interface IAdapter {
	request<T = unknown>(method: string, path: string, body?: unknown, query?: Record<string, string>, options?: AdapterOptions): Promise<AdapterResponse<T>>
	withOptions(options: AdapterOptions): IAdapter
}

export interface AdapterResponse<T> {
	status: number
	statusText: string
	data: T
	headers: Record<string, string>
}

export interface AdapterError<T> {
	code?: string
	response?: AdapterResponse<T>
	isOpenApiError: boolean
}

export interface AdapterOptions{
	[key: string]: unknown
	baseURL?: string
}
