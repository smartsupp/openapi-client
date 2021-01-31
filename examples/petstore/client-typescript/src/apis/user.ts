/* tslint:disable */
/* eslint-disable */

import * as types from '../types'

export class UserClient<O> {
	raw: UserClientRaw<O>

	constructor(public adapter: types.IAdapter) {
		this.raw = new UserClientRaw(this.adapter)
	}

	createUser(body?: types.User, options?: O): Promise<void> {
		return this.adapter
			.request('post', `/user`, body, null, options)
			.then(toData)
			.catch((err) => {
				if (err.status === 404) {
					return null
				} else {
					throw err
				}
			})
	}

	createUsersWithListInput(body?: types.User[], options?: O): Promise<types.User> {
		return this.adapter.request('post', `/user/createWithList`, body, null, options).then(toData)
	}

	loginUser(query?: types.UserApi.LoginUserQuery, options?: O): Promise<string> {
		return this.adapter.request('get', `/user/login`, null, query, options).then(toData)
	}

	logoutUser(options?: O): Promise<void> {
		return this.adapter
			.request('get', `/user/logout`, null, null, options)
			.then(toData)
			.catch((err) => {
				if (err.status === 404) {
					return null
				} else {
					throw err
				}
			})
	}

	getUserByName(username: string, options?: O): Promise<types.User> {
		return this.adapter.request('get', `/user/${username}`, null, null, options).then(toData)
	}

	updateUser(username: string, body?: types.User, options?: O): Promise<void> {
		return this.adapter
			.request('put', `/user/${username}`, body, null, options)
			.then(toData)
			.catch((err) => {
				if (err.status === 404) {
					return null
				} else {
					throw err
				}
			})
	}

	deleteUser(username: string, options?: O): Promise<void> {
		return this.adapter
			.request('delete', `/user/${username}`, null, null, options)
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

export class UserClientRaw<O> {
	constructor(public adapter: types.IAdapter) {}

	createUser(body?: types.User, options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('post', `/user`, body, null, options)
	}

	createUsersWithListInput(body?: types.User[], options?: O): Promise<types.AdapterResponse<types.User>> {
		return this.adapter.request('post', `/user/createWithList`, body, null, options)
	}

	loginUser(query?: types.UserApi.LoginUserQuery, options?: O): Promise<types.AdapterResponse<string>> {
		return this.adapter.request('get', `/user/login`, null, query, options)
	}

	logoutUser(options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('get', `/user/logout`, null, null, options)
	}

	getUserByName(username: string, options?: O): Promise<types.AdapterResponse<types.User>> {
		return this.adapter.request('get', `/user/${username}`, null, null, options)
	}

	updateUser(username: string, body?: types.User, options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('put', `/user/${username}`, body, null, options)
	}

	deleteUser(username: string, options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('delete', `/user/${username}`, null, null, options)
	}
}

// helpers

function toData(res) {
	return res.data
}
