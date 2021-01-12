import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Groups = SmartsuppCoreApi.Groups

export class GroupsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	list(options?): Promise<SmartsuppCoreApi.Group[]> {
		return this.adapter.request('get', `/groups`, null, null, options)
	}
	create(body: Groups.CreateBody, options?): Promise<SmartsuppCoreApi.Group> {
		return this.adapter.request('post', `/groups`, body, null, options)
	}
	get(id: number, options?): Promise<SmartsuppCoreApi.Group> {
		return this.adapter.request('get', `/groups/${id}`, null, null, options)
	}
	update(id: number, body: Groups.UpdateBody, options?): Promise<SmartsuppCoreApi.Group> {
		return this.adapter.request('patch', `/groups/${id}`, body, null, options)
	}
	delete(id: number, options?): Promise<void> {
		return this.adapter.request('delete', `/groups/${id}`, null, null, options)
	}
	deleteBatch(body: SmartsuppCoreApi.TypicalBatchDeleteRequest, options?): Promise<SmartsuppCoreApi.TypicalBatchDeleteResponse> {
		return this.adapter.request('delete', `/groups/batch`, body, null, options)
	}
}
