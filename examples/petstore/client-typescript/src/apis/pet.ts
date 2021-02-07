/* tslint:disable */
/* eslint-disable */

import * as types from '../types'

export class PetClient<O> {
	raw: PetClientRaw<O>

	constructor(public adapter: types.IAdapter) {
		this.raw = new PetClientRaw(this.adapter)
	}

	updatePet(body: types.Pet, options?: O): Promise<types.Pet> {
		return this.adapter.request('put', `/pet`, body, null, options).then(toData)
	}

	addPet(body: types.Pet, options?: O): Promise<types.Pet> {
		return this.adapter.request('post', `/pet`, body, null, options).then(toData)
	}

	findPetsByStatus(query?: types.PetApi.FindPetsByStatusQuery, options?: O): Promise<types.Pet[]> {
		return this.adapter.request('get', `/pet/findByStatus`, null, query, options).then(toData)
	}

	findPetsByTags(query?: types.PetApi.FindPetsByTagsQuery, options?: O): Promise<types.Pet[]> {
		return this.adapter.request('get', `/pet/findByTags`, null, query, options).then(toData)
	}

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

	updatePet(body: types.Pet, options?: O): Promise<types.AdapterResponse<types.Pet>> {
		return this.adapter.request('put', `/pet`, body, null, options)
	}

	addPet(body: types.Pet, options?: O): Promise<types.AdapterResponse<types.Pet>> {
		return this.adapter.request('post', `/pet`, body, null, options)
	}

	findPetsByStatus(query?: types.PetApi.FindPetsByStatusQuery, options?: O): Promise<types.AdapterResponse<types.Pet[]>> {
		return this.adapter.request('get', `/pet/findByStatus`, null, query, options)
	}

	findPetsByTags(query?: types.PetApi.FindPetsByTagsQuery, options?: O): Promise<types.AdapterResponse<types.Pet[]>> {
		return this.adapter.request('get', `/pet/findByTags`, null, query, options)
	}

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
