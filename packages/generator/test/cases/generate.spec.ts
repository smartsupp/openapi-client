import { generateClients } from '../../src/'

describe('generate client', () => {
	test('should create files', () => {
		generateClients(require('../data/petstore.json'), [{
			name: 'typescript',
			outDir: __dirname + '/../out/typescript',
			compilerOptions: {
				npmName: 'swagger-petstore-client',
				npmAuthor: 'Swagger',
				clientClass: 'SwaggerPetstoreClient',
				nativeEnum: true,
			},
		}])
	})
})
