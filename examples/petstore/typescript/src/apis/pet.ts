import * as types from '../types'

export class PetClient<O> {
	raw: PetClientRaw<O>

	constructor(public adapter: types.IAdapter) {
		this.raw = new PetClientRaw(this.adapter)
	}

	/**
	 * Update an existing pet by Id
	 */
	updatePet(body: types.Pet, options?: O): Promise<types.Pet> {
		return this.adapter.request('put', '/pet', body, null, options).then(toData)
	}

	/**
	 * Add a new pet to the store
	 */
	addPet(body: types.Pet, options?: O): Promise<types.Pet> {
		return this.adapter.request('post', '/pet', body, null, options).then(toData)
	}

	/**
	 * Multiple status values can be provided with comma separated strings
	 */
	findPetsByStatus(query?: types.PetApi.FindPetsByStatusQuery, options?: O): Promise<types.Pet[]> {
		return this.adapter.request('get', '/pet/findByStatus', null, query, options).then(toData)
	}

	/**
	 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
	 */
	findPetsByTags(query?: types.PetApi.FindPetsByTagsQuery, options?: O): Promise<types.Pet[]> {
		return this.adapter.request('get', '/pet/findByTags', null, query, options).then(toData)
	}

	/**
	 * Returns a single pet
	 */
	getPetById(petId: number, options?: O): Promise<types.Pet> {
		return this.adapter.request('get', `/pet/${petId}`, null, null, options).then(toData)
	}

	updatePetWithForm(petId: number, query?: types.PetApi.UpdatePetWithFormQuery, options?: O): Promise<void> {
		return this.adapter.request('post', `/pet/${petId}`, null, query, options).then(toData)
	}

	deletePet(petId: number, options?: O): Promise<void> {
		return this.adapter.request('delete', `/pet/${petId}`, null, null, options).then(toData)
	}
}

export class PetClientRaw<O> {
	constructor(public adapter: types.IAdapter) {}

	/**
	 * Update an existing pet by Id
	 */
	updatePet(body: types.Pet, options?: O): Promise<types.AdapterResponse<types.Pet>> {
		return this.adapter.request('put', '/pet', body, null, options)
	}

	/**
	 * Add a new pet to the store
	 */
	addPet(body: types.Pet, options?: O): Promise<types.AdapterResponse<types.Pet>> {
		return this.adapter.request('post', '/pet', body, null, options)
	}

	/**
	 * Multiple status values can be provided with comma separated strings
	 */
	findPetsByStatus(query?: types.PetApi.FindPetsByStatusQuery, options?: O): Promise<types.AdapterResponse<types.Pet[]>> {
		return this.adapter.request('get', '/pet/findByStatus', null, query, options)
	}

	/**
	 * Multiple tags can be provided with comma separated strings. Use tag1, tag2, tag3 for testing.
	 */
	findPetsByTags(query?: types.PetApi.FindPetsByTagsQuery, options?: O): Promise<types.AdapterResponse<types.Pet[]>> {
		return this.adapter.request('get', '/pet/findByTags', null, query, options)
	}

	/**
	 * Returns a single pet
	 */
	getPetById(petId: number, options?: O): Promise<types.AdapterResponse<types.Pet>> {
		return this.adapter.request('get', `/pet/${petId}`, null, null, options)
	}

	updatePetWithForm(petId: number, query?: types.PetApi.UpdatePetWithFormQuery, options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('post', `/pet/${petId}`, null, query, options)
	}

	deletePet(petId: number, options?: O): Promise<types.AdapterResponse<void>> {
		return this.adapter.request('delete', `/pet/${petId}`, null, null, options)
	}
}

// helpers

function toData(res) {
	return res.data
}
