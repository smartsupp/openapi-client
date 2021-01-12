import { IAdapter } from '../adapter'
import { SmartsuppCoreApi } from '../types'
import ProductNews = SmartsuppCoreApi.ProductNews

export class ProductNewsClient {
	constructor(
		private adapter: IAdapter
	) {
	}
	list(query: ProductNews.ListQuery, options?): Promise<SmartsuppCoreApi.ProductNew[]> {
		return this.adapter.request('get', `/product-news`, null, query, options)
	}
	read(options?): Promise<void> {
		return this.adapter.request('post', `/product-news/confirm`, null, null, options)
	}
}
