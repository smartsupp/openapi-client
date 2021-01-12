import { IAdapter } from './adapter'
import { Conversations } from './libs/conversations'

export class Client {
	conversations: Conversations

	constructor(adapter: IAdapter) {
		this.conversations = new Conversations(adapter)
	}
}
