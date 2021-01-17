/* tslint:disable */
/* eslint-disable */
import * as types from '../types'

export class StoreClient {
	constructor(private adapter: types.IAdapter) {}
	getInventory(options?): Promise<types.StoreApi.GetInventoryResponse> {
		return this.adapter.request('get', `/store/inventory`, null, null, options)
	}
	placeOrder(body: types.Order, options?): Promise<types.Order> {
		return this.adapter.request('post', `/store/order`, body, null, options)
	}
	getOrderById(orderId: number, options?): Promise<types.Order> {
		return this.adapter.request('get', `/store/order/${orderId}`, null, null, options)
	}
	deleteOrder(orderId: number, options?): Promise<void> {
		return this.adapter.request('delete', `/store/order/${orderId}`, null, null, options)
	}
}
