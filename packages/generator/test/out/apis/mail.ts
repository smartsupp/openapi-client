import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Mail = SmartsuppCoreApi.Mail

export class MailClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	send(name: string, body: Mail.SendBody, options?): Promise<void> {
		return this.adapter.request('post', `/mail/${name}`, body, null, options)
	}
}
