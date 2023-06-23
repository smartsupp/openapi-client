import { inspect } from 'util'
import { Transformer } from '../../src/'

describe('Transformer', () => {
	let transformer: Transformer

	beforeEach(() => {
		transformer = new Transformer(require('../data/spec.json'))
	})

	test('toData()', () => {
		const result = transformer.transform()
		expect(result).toBeDefined()
		process.env.TEST_DEBUG && dump(result)
	})
})

function dump(obj) {
	// eslint-disable-next-line no-console
	console.log(inspect(obj, false, null, true))
}
