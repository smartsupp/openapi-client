import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Onboarding = SmartsuppCoreApi.Onboarding

export class OnboardingClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	update(body: Onboarding.UpdateBody, options?): Promise<Onboarding.UpdateResponse[]> {
		return this.adapter.request('patch', `/onboarding`, body, null, options)
	}
}
