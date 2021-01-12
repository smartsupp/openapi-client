import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Visitors = SmartsuppCoreApi.Visitors

export class VisitorsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	search(body: Visitors.SearchBody, options?): Promise<Visitors.SearchResponse> {
		return this.adapter.request('post', `/v2/visitors/search`, body, null, options)
	}
	get(id: string, options?): Promise<SmartsuppCoreApi.Visitor> {
		return this.adapter.request('get', `/v2/visitors/${id}`, null, null, options)
	}
	startChat(id: string, options?): Promise<Visitors.StartChatResponse> {
		return this.adapter.request('post', `/v2/visitors/${id}/chats`, null, null, options)
	}
	identify(id: string, options?): Promise<SmartsuppCoreApi.Contact> {
		return this.adapter.request('post', `/v2/visitors/${id}/identify`, null, null, options)
	}
}
