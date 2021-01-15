/* tslint:disable */
/* eslint-disable */
import { IAdapter } from './types';
import { SwaggerPetstoreClient } from './client';
export * from './types';
export * from './client';
export * from './apis/pet';
export * from './apis/store';
export * from './apis/user';
export function createClient(adapter: IAdapter): SwaggerPetstoreClient {
	return new SwaggerPetstoreClient(adapter);
}
// default export all
import * as _export from '.';
export default _export;
