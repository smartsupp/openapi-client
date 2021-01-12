import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Widget = SmartsuppCoreApi.Widget

export class WidgetClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	get(options?): Promise<SmartsuppCoreApi.WidgetConfig> {
		return this.adapter.request('get', `/v2/widget`, null, null, options)
	}
	update(body: Widget.UpdateBody, options?): Promise<SmartsuppCoreApi.WidgetConfig> {
		return this.adapter.request('patch', `/v2/widget`, body, null, options)
	}
	getTranslates(lang: string, options?): Promise<SmartsuppCoreApi.WidgetTranslates> {
		return this.adapter.request('get', `/v2/widget/${lang}/translates`, null, null, options)
	}
	updateTranslates(lang: string, body: SmartsuppCoreApi.WidgetTranslates, options?): Promise<SmartsuppCoreApi.WidgetTranslates> {
		return this.adapter.request('put', `/v2/widget/${lang}/translates`, body, null, options)
	}
	getLanguages(options?): Promise<SmartsuppCoreApi.WidgetLanguage[]> {
		return this.adapter.request('get', `/v2/widget/languages`, null, null, options)
	}
}
