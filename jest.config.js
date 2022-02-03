// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	testEnvironment: "node",
	testMatch: [
		`<rootDir>/**/*.spec.ts`
	],
	testPathIgnorePatterns: [
		`<rootDir>/node_modules/`,
	],
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},
	modulePathIgnorePatterns: [
		"out",
		"dist",
	],
	moduleNameMapper: {
		'^@openapi-client/(.*)': '<rootDir>/../$1/src',
	},
};
