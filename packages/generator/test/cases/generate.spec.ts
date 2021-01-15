import { generateClient } from '../../src/'

describe('generate client', () => {
	test('should create files', () => {
		generateClient(require('../data/spec.json'), 'typescript', {
			outDir: __dirname + '/../out',
			compilerOptions: {
				npmName: '@smartsupp/client-core-api',
				npmAuthor: 'Smartsupp',
				npmLicense: 'ISC',
				npmVersion: '1.0.3',
				npmPublishConfig: { registry: "https://npm.pkg.github.com/" },
				npmRepository: "https://github.com/smartsupp/smartsupp-app-gateway.git",
				clientClass: 'SmartsuppCoreClient',
			}
		})
	})
})
