import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import User = SmartsuppCoreApi.User

export class UserClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	get(options?): Promise<SmartsuppCoreApi.User> {
		return this.adapter.request('get', `/user`, null, null, options)
	}
	update(body: User.UpdateBody, options?): Promise<User.UpdateResponse> {
		return this.adapter.request('patch', `/user`, body, null, options)
	}
	getStats(query: User.GetStatsQuery, options?): Promise<User.GetStatsResponse> {
		return this.adapter.request('get', `/user/stats`, null, query, options)
	}
	getUnreadChats(options?): Promise<User.GetUnreadChatsResponse> {
		return this.adapter.request('get', `/user/unread-chats`, null, null, options)
	}
}
