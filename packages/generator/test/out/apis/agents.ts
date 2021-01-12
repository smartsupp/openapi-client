import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Agents = SmartsuppCoreApi.Agents

export class AgentsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	list(options?): Promise<SmartsuppCoreApi.Agent[]> {
		return this.adapter.request('get', `/agents`, null, null, options)
	}
	get(id: number, options?): Promise<SmartsuppCoreApi.Agent> {
		return this.adapter.request('get', `/agents/${id}`, null, null, options)
	}
	update(id: number, body: Agents.UpdateBody, options?): Promise<SmartsuppCoreApi.Agent> {
		return this.adapter.request('patch', `/agents/${id}`, body, null, options)
	}
	delete(id: number, options?): Promise<void> {
		return this.adapter.request('delete', `/agents/${id}`, null, null, options)
	}
	updateActive(id: number, body: Agents.UpdateActiveBody, options?): Promise<Agents.UpdateActiveResponse> {
		return this.adapter.request('patch', `/agents/${id}/active`, body, null, options)
	}
}
