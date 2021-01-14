import { generateClient } from '../../src/'

describe('generate client', () => {
	test('should create files', () => {
		generateClient(require('../data/spec3.json'), {
			outDir: __dirname + '/../out',
		})
	})
})
