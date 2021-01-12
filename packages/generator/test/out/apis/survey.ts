import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Survey = SmartsuppCoreApi.Survey

export class SurveyClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	answer(body: Survey.AnswerBody, options?): Promise<void> {
		return this.adapter.request('post', `/survey/answer`, body, null, options)
	}
}
