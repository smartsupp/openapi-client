import { generateClients } from '../../src/'

const specFile = 'petstore.json'

test('should create files', () => {
	generateClients(require(`../data/${specFile}`), [{
		name: 'typescript',
		outDir: __dirname + '/../out/typescript',
		compilerOptions: {
			npmName: 'swagger-petstore-client',
			npmAuthor: 'Swagger',
			clientClass: 'SwaggerPetstoreClient',
		},
	}])
})
