import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Restrictions = SmartsuppCoreApi.Restrictions

export class RestrictionsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	list(options?): Promise<SmartsuppCoreApi.Restriction[]> {
		return this.adapter.request('get', `/restrictions`, null, null, options)
	}
	create(body: Restrictions.CreateBody, options?): Promise<SmartsuppCoreApi.Restriction> {
		return this.adapter.request('post', `/restrictions`, body, null, options)
	}
	get(id: number, options?): Promise<SmartsuppCoreApi.Restriction> {
		return this.adapter.request('get', `/restrictions/${id}`, null, null, options)
	}
	update(id: number, body: Restrictions.UpdateBody, options?): Promise<SmartsuppCoreApi.Restriction> {
		return this.adapter.request('patch', `/restrictions/${id}`, body, null, options)
	}
	delete(id: number, options?): Promise<void> {
		return this.adapter.request('delete', `/restrictions/${id}`, null, null, options)
	}
	deleteBatch(body: SmartsuppCoreApi.TypicalBatchDeleteRequest, options?): Promise<SmartsuppCoreApi.TypicalBatchDeleteResponse> {
		return this.adapter.request('delete', `/restrictions/batch`, body, null, options)
	}
}
