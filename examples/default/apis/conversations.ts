import { IAdapter } from '../adapter'
import { SmartsuppCoreAPI } from '../types'
import ConversationsAPI = SmartsuppCoreAPI.ConversationsAPI
import Conversation = SmartsuppCoreAPI.Conversation

export class Conversations {
	constructor(
		private adapter: IAdapter
	) {
	}

	get(id: string, query: ConversationsAPI.GetQuery, options?): Promise<Conversation> {
		return this.adapter.request('get',  `/conversations/${id}`, null, query, options)
	}

	assign(id: string, body: ConversationsAPI.AssignBody, options?): Promise<Conversation> {
		return this.adapter.request('patch',  `/conversations/${id}/assign`, body, null, options)
	}

	search(id: string, body: ConversationsAPI.SearchBody, query: ConversationsAPI.SearchQuery, options?): Promise<ConversationsAPI.SearchResponse> {
		return this.adapter.request('post',  `/conversations/${id}/search`, body, query, options)
	}
}
