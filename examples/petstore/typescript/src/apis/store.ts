import * as types from '../types'

export class StoreClient<O> {
	raw: StoreClientRaw<O>

	constructor(public adapter: types.IAdapter) {
		this.raw = new StoreClientRaw(this.adapter)
	}

	/**
	 * Returns a map of status codes to quantities
	 */
	getInventory(options?: O): Promise<types.StoreApi.GetInventoryResponse> {
		return this.adapter.request('get', '/store/inventory', null, null, options).then(toData)
	}

	/**
	 * Place a new order in the store
	 */
	placeOrder(body?: types.Order, options?: O): Promise<types.Order> {
		return this.adapter.request('post', '/store/order', body, null, options).then(toData)
	}

	/**
	 * For valid response try integer IDs with value &lt;&#x3D; 5 or &gt; 10. Other values will generated exceptions
	 */
	getOrderById(orderId: number, options?: O): Promise<types.Order> {
		return this.adapter.request('get', `/store/order/${orderId}`, null, null, options).then(toData)
	}

	/**
	 * For valid response try integer IDs with value &lt; 1000. Anything above 1000 or nonintegers will generate API errors
	 */
	deleteOrder(orderId: number, options?: O): Promise<void> {
		return this.adapter.request('delete', `/store/order/${orderId}`, null, null, options).then(toData)
	}
}

export class StoreClientRaw<O> {
	constructor(public adapter: types.IAdapter) {}

	/**
	 * Returns a map of status codes to quantities
	 */
	getInventory(options?: O): Promise<types.AdapterResponse<types.StoreApi.GetInventoryResponse>> {
		return this.adapter.request('get', '/store/inventory', null, null, options)
	}

	/**
	 * Place a new order in the store
	 */
	placeOrder(body?: types.Order, options?: O): Promise<types.AdapterResponse<types.Order>> {
		return this.adapter.request('post', '/store/order', body, null, options)
	}

	/**
	 * For valid response try integer IDs with value &lt;&#x3D; 5 or &gt; 10. Other values will generated exceptions
	 */
	getOrderById(orderId: number, options?: O): Promise<types.AdapterResponse<types.Order>> {
		return this.adapter.request('get', `/store/order/${orderId}`, null, null, options)
	}

	/**
	 * For valid response try integer IDs with value &lt; 1000. Anything above 1000 or nonintegers will generate API errors
	 */
	deleteOrder(orderId: number, options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('delete', `/store/order/${orderId}`, null, null, options)
	}
}

// helpers

function toData(res) {
	return res.data
}
