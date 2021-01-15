/* tslint:disable */
/* eslint-disable */
import { IAdapter } from './types';
import { PetClient } from './apis/pet';
import { StoreClient } from './apis/store';
import { UserClient } from './apis/user';

export class SwaggerPetstoreClient {
	pet: PetClient;
	store: StoreClient;
	user: UserClient;
	constructor(adapter: IAdapter) {
		this.pet = new PetClient(adapter);
		this.store = new StoreClient(adapter);
		this.user = new UserClient(adapter);
	}
}
