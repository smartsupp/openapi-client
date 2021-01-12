import { generateClient } from '../../src/'

describe('generate client', () => {
	test('should create files', () => {
		generateClient(require('../data/spec2.json'), {
			outDir: __dirname + '/../out'
		})
	})
})
