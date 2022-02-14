import { generateMultiClients } from '../../src/'

const specFile = 'petstore.json'

test('should create files', () => {
	generateMultiClients({
		v1: require(`../data/${specFile}`),
		v2: require(`../data/${specFile}`),
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
