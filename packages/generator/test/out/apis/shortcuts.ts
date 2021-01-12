import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Shortcuts = SmartsuppCoreApi.Shortcuts

export class ShortcutsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	list(options?): Promise<SmartsuppCoreApi.Shortcut[]> {
		return this.adapter.request('get', `/shortcuts`, null, null, options)
	}
	create(body: Shortcuts.CreateBody, options?): Promise<SmartsuppCoreApi.Shortcut> {
		return this.adapter.request('post', `/shortcuts`, body, null, options)
	}
	get(id: number, options?): Promise<SmartsuppCoreApi.Shortcut> {
		return this.adapter.request('get', `/shortcuts/${id}`, null, null, options)
	}
	update(id: number, body: Shortcuts.UpdateBody, options?): Promise<SmartsuppCoreApi.Shortcut> {
		return this.adapter.request('patch', `/shortcuts/${id}`, body, null, options)
	}
	delete(id: number, options?): Promise<void> {
		return this.adapter.request('delete', `/shortcuts/${id}`, null, null, options)
	}
	deleteBatch(body: SmartsuppCoreApi.TypicalBatchDeleteRequest, options?): Promise<SmartsuppCoreApi.TypicalBatchDeleteResponse> {
		return this.adapter.request('delete', `/shortcuts/batch`, body, null, options)
	}
}
