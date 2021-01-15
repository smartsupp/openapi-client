/* tslint:disable */
/* eslint-disable */

export interface IAdapter {
	request<T>(method: string, path: string, body?, query?, options?): Promise<T>;
}

export interface Order {
	id?: number;
	petId?: number;
	quantity?: number;
	shipDate?: string;
	/** Order Status */
	status?: string;
	complete?: boolean;
}

export interface Customer {
	id?: number;
	username?: string;
	address?: Address[];
}

export interface Address {
	street?: string;
	city?: string;
	state?: string;
	zip?: string;
}

export interface Category {
	id?: number;
	name?: string;
}

export interface User {
	id?: number;
	username?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	phone?: string;
	/** User Status */
	userStatus?: number;
}

export interface Tag {
	id?: number;
	name?: string;
}

export interface Pet {
	id?: number;
	name: string;
	category?: Category;
	photoUrls: string[];
	tags?: Tag[];
	/** pet status in the store */
	status?: string;
}

export interface ApiResponse {
	code?: number;
	type?: string;
	message?: string;
}

export namespace PetApi {

	export interface FindPetsByStatusQuery {
		/** Status values that need to be considered for filter */
		status?: string;
	}

	export interface FindPetsByTagsQuery {
		/** Tags to filter by */
		tags?: string[];
	}

	export interface UpdatePetWithFormQuery {
		/** Name of pet that needs to be updated */
		name?: string;
		/** Status of pet that needs to be updated */
		status?: string;
	}
}

export namespace StoreApi {

	export interface GetInventoryResponse {
		[keyof: string]: number;
	}
}

export namespace UserApi {

	export interface LoginUserQuery {
		/** The user name for login */
		username?: string;
		/** The password for login in clear text */
		password?: string;
	}
}
