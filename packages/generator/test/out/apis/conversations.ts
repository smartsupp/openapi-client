import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Conversations = SmartsuppCoreApi.Conversations

export class ConversationsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	deleteMany(body: Conversations.DeleteManyBody, options?): Promise<Conversations.DeleteManyResponse[]> {
		return this.adapter.request('post', `/v2/conversations/delete`, body, null, options)
	}
	search(body: Conversations.SearchBody, query: Conversations.SearchQuery, options?): Promise<Conversations.SearchResponse> {
		return this.adapter.request('post', `/v2/conversations/search`, body, query, options)
	}
	get(id: string, query: Conversations.GetQuery, options?): Promise<SmartsuppCoreApi.Conversation> {
		return this.adapter.request('get', `/v2/conversations/${id}`, null, query, options)
	}
	update(id: string, body: Conversations.UpdateBody, options?): Promise<SmartsuppCoreApi.Conversation> {
		return this.adapter.request('patch', `/v2/conversations/${id}`, body, null, options)
	}
	createMessage(id: string, body: Conversations.CreateMessageBody, options?): Promise<SmartsuppCoreApi.Message> {
		return this.adapter.request('post', `/v2/conversations/${id}`, body, null, options)
	}
	delete(id: string, options?): Promise<void> {
		return this.adapter.request('delete', `/v2/conversations/${id}`, null, null, options)
	}
	join(id: string, query: Conversations.JoinQuery, options?): Promise<void> {
		return this.adapter.request('patch', `/v2/conversations/${id}/join`, null, query, options)
	}
	leave(id: string, options?): Promise<void> {
		return this.adapter.request('patch', `/v2/conversations/${id}/leave`, null, null, options)
	}
	assign(id: string, body: Conversations.AssignBody, options?): Promise<void> {
		return this.adapter.request('patch', `/v2/conversations/${id}/assign`, body, null, options)
	}
	unassign(id: string, body: Conversations.UnassignBody, options?): Promise<void> {
		return this.adapter.request('patch', `/v2/conversations/${id}/unassign`, body, null, options)
	}
	read(id: string, options?): Promise<Conversations.ReadResponse> {
		return this.adapter.request('patch', `/v2/conversations/${id}/read`, null, null, options)
	}
	close(id: string, options?): Promise<void> {
		return this.adapter.request('patch', `/v2/conversations/${id}/close`, null, null, options)
	}
	transcript(id: string, body: Conversations.TranscriptBody, options?): Promise<void> {
		return this.adapter.request('post', `/v2/conversations/${id}/transcript`, body, null, options)
	}
	uploadInit(id: string, body: Conversations.UploadInitBody, options?): Promise<Conversations.UploadInitResponse> {
		return this.adapter.request('post', `/v2/conversations/${id}/upload-init`, body, null, options)
	}
	uploadFinish(id: string, body: Conversations.UploadFinishBody, options?): Promise<SmartsuppCoreApi.Message> {
		return this.adapter.request('post', `/v2/conversations/${id}/upload-finish`, body, null, options)
	}
	listMessages(id: string, query: Conversations.ListMessagesQuery, options?): Promise<Conversations.ListMessagesResponse> {
		return this.adapter.request('get', `/v2/conversations/${id}/messages`, null, query, options)
	}
	listPaths(id: string, query: Conversations.ListPathsQuery, options?): Promise<Conversations.ListPathsResponse> {
		return this.adapter.request('get', `/v2/conversations/${id}/paths`, null, query, options)
	}
}
