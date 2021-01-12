import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Officehours = SmartsuppCoreApi.Officehours

export class OfficehoursClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	get(options?): Promise<SmartsuppCoreApi.OfficeHours> {
		return this.adapter.request('get', `/officehours`, null, null, options)
	}
	update(body: Officehours.UpdateBody, options?): Promise<SmartsuppCoreApi.OfficeHours> {
		return this.adapter.request('post', `/officehours`, body, null, options)
	}
}
