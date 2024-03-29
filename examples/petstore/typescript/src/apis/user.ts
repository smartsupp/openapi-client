import * as types from '../types'

export class UserClient<O> {
	raw: UserClientRaw<O>

	constructor(public adapter: types.IAdapter) {
		this.raw = new UserClientRaw(this.adapter)
	}

	/**
	 * This can only be done by the logged in user.
	 */
	createUser(body?: types.User, options?: O): Promise<void> {
		return this.adapter.request('post', '/user', body, null, options).then(toData)
	}

	/**
	 * Creates list of users with given input array
	 */
	createUsersWithListInput(body?: types.User[], options?: O): Promise<types.User> {
		return this.adapter.request('post', '/user/createWithList', body, null, options).then(toData)
	}

	loginUser(query?: types.UserApi.LoginUserQuery, options?: O): Promise<string> {
		return this.adapter.request('get', '/user/login', null, query, options).then(toData)
	}

	logoutUser(options?: O): Promise<void> {
		return this.adapter.request('get', '/user/logout', null, null, options).then(toData)
	}

	getUserByName(username: string, options?: O): Promise<types.User> {
		return this.adapter.request('get', `/user/${username}`, null, null, options).then(toData)
	}

	/**
	 * This can only be done by the logged in user.
	 */
	updateUser(username: string, body?: types.User, options?: O): Promise<void> {
		return this.adapter.request('put', `/user/${username}`, body, null, options).then(toData)
	}

	/**
	 * This can only be done by the logged in user.
	 */
	deleteUser(username: string, options?: O): Promise<void> {
		return this.adapter.request('delete', `/user/${username}`, null, null, options).then(toData)
	}
}

export class UserClientRaw<O> {
	constructor(public adapter: types.IAdapter) {}

	/**
	 * This can only be done by the logged in user.
	 */
	createUser(body?: types.User, options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('post', '/user', body, null, options)
	}

	/**
	 * Creates list of users with given input array
	 */
	createUsersWithListInput(body?: types.User[], options?: O): Promise<types.AdapterResponse<types.User>> {
		return this.adapter.request('post', '/user/createWithList', body, null, options)
	}

	loginUser(query?: types.UserApi.LoginUserQuery, options?: O): Promise<types.AdapterResponse<string>> {
		return this.adapter.request('get', '/user/login', null, query, options)
	}

	logoutUser(options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('get', '/user/logout', null, null, options)
	}

	getUserByName(username: string, options?: O): Promise<types.AdapterResponse<types.User>> {
		return this.adapter.request('get', `/user/${username}`, null, null, options)
	}

	/**
	 * This can only be done by the logged in user.
	 */
	updateUser(username: string, body?: types.User, options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('put', `/user/${username}`, body, null, options)
	}

	/**
	 * This can only be done by the logged in user.
	 */
	deleteUser(username: string, options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('delete', `/user/${username}`, null, null, options)
	}
}

// helpers

function toData(res) {
	return res.data
}
