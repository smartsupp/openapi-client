import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Contacts = SmartsuppCoreApi.Contacts

export class ContactsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	get(id: string, options?): Promise<SmartsuppCoreApi.Contact> {
		return this.adapter.request('get', `/v2/contacts/${id}`, null, null, options)
	}
	update(id: string, body: Contacts.UpdateBody, options?): Promise<SmartsuppCoreApi.Contact> {
		return this.adapter.request('patch', `/v2/contacts/${id}`, body, null, options)
	}
	ban(id: string, options?): Promise<SmartsuppCoreApi.Contact> {
		return this.adapter.request('patch', `/v2/contacts/${id}/ban`, null, null, options)
	}
	unban(id: string, options?): Promise<SmartsuppCoreApi.Contact> {
		return this.adapter.request('patch', `/v2/contacts/${id}/unban`, null, null, options)
	}
}
