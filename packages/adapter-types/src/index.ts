export interface IAdapter<TOptions> {
	request<ResponseData = unknown>(method: string, path: string, body?: unknown, query?: Record<string, string>, options?: TOptions): Promise<AdapterResponse<ResponseData>>
	withOptions(options: TOptions): IAdapter<TOptions>
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

