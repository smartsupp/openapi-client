import { generateClient } from '../../src/'

describe('generate client', () => {
	test('should create files', () => {
		generateClient(require('../data/openapi.json'), 'typescript', {
			outDir: __dirname + '/../out',
			compilerOptions: {
				npmName: 'petstore',
				npmAuthor: 'Swagger',
				clientClass: 'PetstoreClient',
			}
		})
	})
})
