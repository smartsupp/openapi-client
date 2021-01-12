import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Mobile = SmartsuppCoreApi.Mobile

export class MobileClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	getConfig(options?): Promise<Mobile.GetConfigResponse> {
		return this.adapter.request('get', `/mobile/config`, null, null, options)
	}
}
