export interface IAdapter {
	request<T>(method: string, path: string, body?, query?, options?):  Promise<T>
}
