/* tslint:disable */
/* eslint-disable */
import * as types from '../types'

export class UserClient {
	constructor(private adapter: types.IAdapter) {}
	createUser(body: types.User, options?): Promise<void> {
		return this.adapter.request('post', `/user`, body, null, options)
	}
	createUsersWithListInput(body: types.User[], options?): Promise<types.User> {
		return this.adapter.request('post', `/user/createWithList`, body, null, options)
	}
	loginUser(query: types.UserApi.LoginUserQuery, options?): Promise<string> {
		return this.adapter.request('get', `/user/login`, null, query, options)
	}
	logoutUser(options?): Promise<void> {
		return this.adapter.request('get', `/user/logout`, null, null, options)
	}
	getUserByName(username: string, options?): Promise<types.User> {
		return this.adapter.request('get', `/user/${username}`, null, null, options)
	}
	updateUser(username: string, body: types.User, options?): Promise<void> {
		return this.adapter.request('put', `/user/${username}`, body, null, options)
	}
	deleteUser(username: string, options?): Promise<void> {
		return this.adapter.request('delete', `/user/${username}`, null, null, options)
	}
}
