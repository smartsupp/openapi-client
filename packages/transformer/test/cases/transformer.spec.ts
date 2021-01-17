import util from 'util'
import { Transformer } from '../../src/'

describe('Transformer', () => {
	let transformer: Transformer

	beforeEach(() => {
		transformer = new Transformer(require('../data/spec.json'))
	})

	test('toData()', () => {
		const result = transformer.transform()
		expect(result).toBeDefined()
		dump(result)
	})
})

function dump(obj) {
	console.log(util.inspect(obj, false, null, true))
}
