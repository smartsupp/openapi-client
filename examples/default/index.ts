import { IAdapter } from './adapter'
import { Client } from './client'

export * from './types'
export * from './client'

export function createClient(adapter: IAdapter): Client {
	return new Client(adapter)
}
