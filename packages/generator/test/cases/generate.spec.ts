import { generateClients, generateMultiClients } from '../../src/'

test('should create files', () => {
	generateClients(require('../data/petstore.json'), [{
		name: 'typescript',
		outDir: __dirname + '/../out/typescript',
		compilerOptions: {
			npmName: 'swagger-petstore-client',
			npmAuthor: 'Swagger',
			clientClass: 'SwaggerPetstoreClient',
		},
	}])
})

test('should create files', () => {
	generateMultiClients({
		v1: require('../data/petstore.json'),
		v2: require('../data/petstore.json'),
	}, [{
		name: 'typescript',
		outDir: __dirname + '/../out/typescript-multi',
		compilerOptions: {
			npmName: 'swagger-petstore-client',
			npmAuthor: 'Swagger',
			clientClass: 'SwaggerPetstoreClient',
		},
	}])
})
