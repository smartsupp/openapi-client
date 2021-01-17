/* tslint:disable */
/* eslint-disable */
import * as types from '../types'

export class PetClient {
	constructor(private adapter: types.IAdapter) {}
	updatePet(body: types.Pet, options?): Promise<types.Pet> {
		return this.adapter.request('put', `/pet`, body, null, options)
	}
	addPet(body: types.Pet, options?): Promise<types.Pet> {
		return this.adapter.request('post', `/pet`, body, null, options)
	}
	findPetsByStatus(query: types.PetApi.FindPetsByStatusQuery, options?): Promise<types.Pet[]> {
		return this.adapter.request('get', `/pet/findByStatus`, null, query, options)
	}
	findPetsByTags(query: types.PetApi.FindPetsByTagsQuery, options?): Promise<types.Pet[]> {
		return this.adapter.request('get', `/pet/findByTags`, null, query, options)
	}
	getPetById(petId: number, options?): Promise<types.Pet> {
		return this.adapter.request('get', `/pet/${petId}`, null, null, options)
	}
	updatePetWithForm(petId: number, query: types.PetApi.UpdatePetWithFormQuery, options?): Promise<void> {
		return this.adapter.request('post', `/pet/${petId}`, null, query, options)
	}
	deletePet(petId: number, options?): Promise<void> {
		return this.adapter.request('delete', `/pet/${petId}`, null, null, options)
	}
}
