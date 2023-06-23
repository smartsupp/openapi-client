import { Compiler } from '../../src/'

describe('Compiler', () => {
	let compiler: Compiler

	beforeEach(() => {
		compiler = new Compiler()
	})

	test('compile interfaces', () => {
		const result = compiler.compile({
			name: 'Smartsupp Core Api',
			info: {
				title: 'Smartsupp Core API',
				version: '1.0.0',
			},
			definitions: [{
				name: 'QueryValue',
				type: 'type',
				values: ['string', 'number', 'boolean'],
			}, {
				name: 'ConversationType',
				type: 'enum',
				values: ['open', 'closed'],
			}, {
				name: 'ConversationRating',
				type: 'enum',
				values: [1, 2, 3, 4, 5],
			}, {
				name: 'ContentFilters',
				type: 'interface',
				additionalType: 'QueryValue',
			}, {
				name: 'Conversation',
				type: 'interface',
				properties: [{
					name: 'id',
					type: 'string',
					required: true,
				}, {
					name: 'type',
					type: ['string', 'number', 'boolean'],
				}],
			}],
			apis: [{
				name: 'conversations',
				definitions: [{
					name: 'AssignBody',
					type: 'interface',
					properties: [{
						name: 'id',
						type: 'string',
						required: true,
					}],
				}],
				operations: [{
					params: [{ name: 'id', type: 'string' }],
					name: 'get',
					method: 'get',
					path: '/conversations/{id}',
					body: null,
					query: {
						type: 'GetQuery',
						required: true,
					},
					response: {
						type: '#Conversation',
					},
				}, {
					params: [],
					name: 'search',
					method: 'post',
					path: '/conversations/search',
					body: {
						type: 'SearchBody',
						required: true,
					},
					query: {
						type: 'SearchQuery',
						required: false,
					},
					response: {
						type: ['SearchResponse', 'array:#Message'],
					},
				}, {
					params: [{ name: 'id', type: 'string' }],
					name: 'messages',
					method: 'get',
					path: '/conversations/{id}/messages',
					body: null,
					query: null,
					response: {
						type: 'array:#Message',
					},
				}],
			}],
		}, {
			npmName: 'smartsupp-core',
		})
		expect(result).toHaveLength(8)
		// eslint-disable-next-line no-console
		process.env.TEST_DEBUG && console.log(result[0].data)
	})

})
