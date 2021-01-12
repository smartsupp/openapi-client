export namespace SmartsuppCoreAPI {

	export interface Conversation {
		id?: string;
		type?: string;
		accountId?: string;
		deletedAt?: any;
		facebook?: any;
	}

	export enum ConversationTypeEnum {
		open = 'open',
		closed = 'closed',
	}

	// Nested apis

	export namespace ConversationsAPI {

		export interface GetQuery {
			contactDetails?: boolean
			visitorDetails?: boolean
			lastMessage?: boolean
			unreadInfo?: boolean
			readInfo?: boolean
			paths?: number
			pathsOrder?: 'asc' | 'desc'
			messages?: number
			messagesOrder?: 'asc' | 'desc'
		}

		export interface AssignBody {
			id: string
		}

		export interface SearchQuery {
			contactDetails?: boolean
			visitorDetails?: boolean
			lastMessage?: boolean
			unreadInfo?: boolean
			readInfo?: boolean
		}

		export interface SearchBody {
			timezone?: string
			size?: number
			after?: Array<number>
			sort?: Array<{
				createdAt?: 'asc' | 'desc'
				finishedAt?: 'asc' | 'desc'
			}>
		}

		export interface SearchResponse {
			after: Array<number>
			items: Array<Conversation>
			total: number
		}

	}

}
