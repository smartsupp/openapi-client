import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Consents = SmartsuppCoreApi.Consents

export class ConsentsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	getAccount(options?): Promise<SmartsuppCoreApi.Consent[]> {
		return this.adapter.request('get', `/consents/account`, null, null, options)
	}
	createAccount(body: SmartsuppCoreApi.RequestConsentCreate, options?): Promise<SmartsuppCoreApi.Consent> {
		return this.adapter.request('post', `/consents/account`, body, null, options)
	}
	getUser(options?): Promise<SmartsuppCoreApi.Consent[]> {
		return this.adapter.request('get', `/consents/user`, null, null, options)
	}
	createUser(body: SmartsuppCoreApi.RequestConsentCreate, options?): Promise<SmartsuppCoreApi.Consent> {
		return this.adapter.request('post', `/consents/user`, body, null, options)
	}
}
