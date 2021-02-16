/* tslint:disable */
/* eslint-disable */

import { IAdapter } from './types'
import { PetClient } from './apis/pet'
import { StoreClient } from './apis/store'
import { UserClient } from './apis/user'

export class SwaggerPetstoreClient<O = any> {
	pet: PetClient<O>
	store: StoreClient<O>
	user: UserClient<O>

	constructor(public adapter: IAdapter) {
		this.pet = new PetClient(adapter)
		this.store = new StoreClient(adapter)
		this.user = new UserClient(adapter)
	}

	withOptions(o: O): SwaggerPetstoreClient {
		return new SwaggerPetstoreClient(this.adapter.withOptions(o))
	}
}
