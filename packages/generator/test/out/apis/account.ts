import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Account = SmartsuppCoreApi.Account

export class AccountClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	get(options?): Promise<SmartsuppCoreApi.Account> {
		return this.adapter.request('get', `/account`, null, null, options)
	}
	update(body: Account.UpdateBody, options?): Promise<SmartsuppCoreApi.Account> {
		return this.adapter.request('patch', `/account`, body, null, options)
	}
	delete(body: Account.DeleteBody, options?): Promise<Account.DeleteResponse> {
		return this.adapter.request('post', `/account/delete`, body, null, options)
	}
}
