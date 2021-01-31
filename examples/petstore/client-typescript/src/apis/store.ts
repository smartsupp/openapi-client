/* tslint:disable */
/* eslint-disable */

import * as types from '../types'

export class StoreClient<O> {
	raw: StoreClientRaw<O>

	constructor(public adapter: types.IAdapter) {
		this.raw = new StoreClientRaw(this.adapter)
	}

	getInventory(options?: O): Promise<types.StoreApi.GetInventoryResponse> {
		return this.adapter.request('get', `/store/inventory`, null, null, options).then(toData)
	}

	placeOrder(body?: types.Order, options?: O): Promise<types.Order> {
		return this.adapter.request('post', `/store/order`, body, null, options).then(toData)
	}

	getOrderById(orderId: number, options?: O): Promise<types.Order> {
		return this.adapter.request('get', `/store/order/${orderId}`, null, null, options).then(toData)
	}

	deleteOrder(orderId: number, options?: O): Promise<void> {
		return this.adapter
			.request('delete', `/store/order/${orderId}`, null, null, options)
			.then(toData)
			.catch((err) => {
				if (err.status === 404) {
					return null
				} else {
					throw err
				}
			})
	}
}

export class StoreClientRaw<O> {
	constructor(public adapter: types.IAdapter) {}

	getInventory(options?: O): Promise<types.AdapterResponse<types.StoreApi.GetInventoryResponse>> {
		return this.adapter.request('get', `/store/inventory`, null, null, options)
	}

	placeOrder(body?: types.Order, options?: O): Promise<types.AdapterResponse<types.Order>> {
		return this.adapter.request('post', `/store/order`, body, null, options)
	}

	getOrderById(orderId: number, options?: O): Promise<types.AdapterResponse<types.Order>> {
		return this.adapter.request('get', `/store/order/${orderId}`, null, null, options)
	}

	deleteOrder(orderId: number, options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('delete', `/store/order/${orderId}`, null, null, options)
	}
}

// helpers

function toData(res) {
	return res.data
}
