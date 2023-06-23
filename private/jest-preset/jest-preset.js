module.exports = {
	preset: 'ts-jest',
	restoreMocks: true,
	timeout: 15000,
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
		'<rootDir>/lib',
	],
	coverageReporters: [
		'text',
		'html',
		'text-summary',
	],
	coveragePathIgnorePatterns: [
		'<rootDir>/node_modules',
		'<rootDir>/test',
	],
}
