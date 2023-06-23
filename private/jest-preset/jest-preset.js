module.exports = {
	preset: 'ts-jest',
	restoreMocks: true,
	roots: [
		'<rootDir>',
	],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	moduleFileExtensions: [
		'ts', 'js', 'json',
	],
	modulePathIgnorePatterns: [
		'<rootDir>/node_modules',
		'<rootDir>/build',
	],
	moduleNameMapper: {
		'^@openapi-client/(.*)': '<rootDir>/../$1/src',
	},
	testRegex: [
		'(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
	],
	testPathIgnorePatterns: [
		'<rootDir>/node_modules',
		'<rootDir>/src',
		'<rootDir>/build',
	],
}
