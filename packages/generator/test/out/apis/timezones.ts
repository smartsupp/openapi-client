import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Timezones = SmartsuppCoreApi.Timezones

export class TimezonesClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	list(options?): Promise<SmartsuppCoreApi.Timezone[]> {
		return this.adapter.request('get', `/timezones`, null, null, options)
	}
}
