import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Invitations = SmartsuppCoreApi.Invitations

export class InvitationsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	invite(body: Invitations.InviteBody, options?): Promise<SmartsuppCoreApi.InvitationInfo[]> {
		return this.adapter.request('post', `/invitations`, body, null, options)
	}
	notify(body: Invitations.NotifyBody, options?): Promise<SmartsuppCoreApi.InvitationInfo[]> {
		return this.adapter.request('post', `/invitations/notify`, body, null, options)
	}
	cancel(body: Invitations.CancelBody, options?): Promise<void> {
		return this.adapter.request('post', `/invitations/cancel`, body, null, options)
	}
}
