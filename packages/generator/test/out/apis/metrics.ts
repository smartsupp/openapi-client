import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import Metrics = SmartsuppCoreApi.Metrics

export class MetricsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	get(body: Metrics.GetBody, options?): Promise<SmartsuppCoreApi.Metric> {
		return this.adapter.request('post', `/v2/metrics`, body, null, options)
	}
	getMany(body: Metrics.GetManyBody, options?): Promise<Metrics.GetManyResponse> {
		return this.adapter.request('post', `/v2/metrics/bulk`, body, null, options)
	}
}
