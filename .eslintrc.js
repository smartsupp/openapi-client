module.exports = {
	globals: {
		console: true,
		module: true,
		require: true,
	},
	env: {
		node: true,
	},
	rules: {
		/**
		 * Possible errors
		 */
		'no-cond-assign': [2, 'except-parens'], // https://eslint.org/docs/rules/no-cond-assign
		'no-console': 1, // https://eslint.org/docs/rules/no-console
		'no-debugger': 1, // https://eslint.org/docs/rules/no-debugger
		'no-alert': 1, // https://eslint.org/docs/rules/no-alert
		'no-constant-condition': 1, // https://eslint.org/docs/rules/no-constant-condition
		'no-dupe-keys': 2, // https://eslint.org/docs/rules/no-dupe-keys
		'no-duplicate-case': 2, // https://eslint.org/docs/rules/no-duplicate-case
		'no-empty': 2, // https://eslint.org/docs/rules/no-empty
		'no-ex-assign': 2, // https://eslint.org/docs/rules/no-ex-assign
		'no-extra-boolean-cast': 0, // https://eslint.org/docs/rules/no-extra-boolean-cast
		'no-extra-semi': 2, // https://eslint.org/docs/rules/no-extra-semi
		'no-func-assign': 2, // https://eslint.org/docs/rules/no-func-assign
		'no-inner-declarations': 2, // https://eslint.org/docs/rules/no-inner-declarations
		'no-invalid-regexp': 2, // https://eslint.org/docs/rules/no-invalid-regexp
		'no-irregular-whitespace': 2, // https://eslint.org/docs/rules/no-irregular-whitespace
		'no-obj-calls': 2, // https://eslint.org/docs/rules/no-obj-calls
		'no-sparse-arrays': 2, // https://eslint.org/docs/rules/no-sparse-arrays
		'no-unreachable': 2, // https://eslint.org/docs/rules/no-unreachable
		'no-dupe-class-members': 'off', // https://eslint.org/docs/rules/no-dupe-class-members
		'use-isnan': 2, // https://eslint.org/docs/rules/use-isnan
		'block-scoped-var': 2, // https://eslint.org/docs/rules/block-scoped-var

		/**
		 * Best practices
		 */
		'consistent-return': 2, // https://eslint.org/docs/rules/consistent-return
		'curly': [2, 'multi-line'], // https://eslint.org/docs/rules/curly
		'default-case': 2, // https://eslint.org/docs/rules/default-case
		'dot-notation': [2, {allowKeywords: true}], // https://eslint.org/docs/rules/dot-notation
		'eqeqeq': 2, // https://eslint.org/docs/rules/eqeqeq
		'guard-for-in': 'off', // https://eslint.org/docs/rules/guard-for-in
		'no-caller': 2, // https://eslint.org/docs/rules/no-caller
		'no-eq-null': 2, // https://eslint.org/docs/rules/no-eq-null
		'no-eval': 2, // https://eslint.org/docs/rules/no-eval
		'no-var': 2, // https://eslint.org/docs/rules/no-var
		'no-extend-native': 2, // https://eslint.org/docs/rules/no-extend-native
		'no-extra-bind': 2, // https://eslint.org/docs/rules/no-extra-bind
		'no-fallthrough': 2, // https://eslint.org/docs/rules/no-fallthrough
		'no-floating-decimal': 2, // https://eslint.org/docs/rules/no-floating-decimal
		'no-implied-eval': 2, // https://eslint.org/docs/rules/no-implied-eval
		'no-lone-blocks': 2, // https://eslint.org/docs/rules/no-lone-blocks
		'no-loop-func': 2, // https://eslint.org/docs/rules/no-loop-func
		'no-multi-str': 2, // https://eslint.org/docs/rules/no-multi-str
		'no-native-reassign': 2, // https://eslint.org/docs/rules/no-native-reassign
		'no-new': 2, // https://eslint.org/docs/rules/no-new
		'no-new-func': 2, // https://eslint.org/docs/rules/no-new-func
		'no-new-wrappers': 2, // https://eslint.org/docs/rules/no-new-wrappers
		'no-octal': 2, // https://eslint.org/docs/rules/no-octal
		'no-octal-escape': 2, // https://eslint.org/docs/rules/no-octal-escape
		'no-param-reassign': 2, // https://eslint.org/docs/rules/no-param-reassign
		'no-proto': 2, // https://eslint.org/docs/rules/no-proto
		'no-redeclare': 'off', // https://eslint.org/docs/rules/no-redeclare
		'no-return-assign': 2, // https://eslint.org/docs/rules/no-return-assign
		'no-script-url': 2, // https://eslint.org/docs/rules/no-script-url
		'no-self-compare': 2, // https://eslint.org/docs/rules/no-self-compare
		'no-sequences': 2, // https://eslint.org/docs/rules/no-sequences
		'no-throw-literal': 2, // https://eslint.org/docs/rules/no-throw-literal
		'no-with': 2, // https://eslint.org/docs/rules/no-with
		'radix': 'off', // https://eslint.org/docs/rules/radix
		'vars-on-top': 0, // https://eslint.org/docs/rules/vars-on-top
		'wrap-iife': [2, 'any'], // https://eslint.org/docs/rules/wrap-iife
		'yoda': 2, // https://eslint.org/docs/rules/yoda
		'prefer-const': [2, {destructuring: 'any', ignoreReadBeforeAssign: false}], // https://eslint.org/docs/rules/prefer-const

		/**
		 * Style
		 */
		'indent': [2, 'tab', {SwitchCase: 1}], // https://eslint.org/docs/rules/indent
		'brace-style': [2, '1tbs', {allowSingleLine: true}], // https://eslint.org/docs/rules/brace-style
		'quotes': [2, 'single', {avoidEscape: true}], // https://eslint.org/docs/rules/quotes
		'comma-spacing': [2, {before: false, after: true}], // https://eslint.org/docs/rules/comma-spacing
		'comma-dangle': [2, 'always-multiline'], // https://eslint.org/docs/rules/comma-dangle
		'comma-style': [2, 'last'], // https://eslint.org/docs/rules/comma-style
		'eol-last': 2, // https://eslint.org/docs/rules/eol-last
		'func-names': 'off', // https://eslint.org/docs/rules/func-names
		'key-spacing': [2, {beforeColon: false, afterColon: true}], // https://eslint.org/docs/rules/key-spacing
		'new-cap': [2, {newIsCap: true}], // https://eslint.org/docs/rules/new-cap
		'no-multiple-empty-lines': [2, {max: 2}], // https://eslint.org/docs/rules/no-multiple-empty-lines
		'no-nested-ternary': 2, // https://eslint.org/docs/rules/no-nested-ternary
		'no-new-object': 2, // https://eslint.org/docs/rules/no-new-object
		'no-spaced-func': 2, // https://eslint.org/docs/rules/no-spaced-func
		'no-extra-parens': [2, 'functions'], // https://eslint.org/docs/rules/no-extra-parens
		'no-underscore-dangle': 0, // https://eslint.org/docs/rules/no-underscore-dangle
		'no-trailing-spaces': [2, {ignoreComments: true}], // https://eslint.org/docs/rules/no-trailing-spaces
		'no-multi-spaces': [2, {ignoreEOLComments: true}], // https://eslint.org/docs/rules/no-multi-spaces
		'one-var': 'off', // https://eslint.org/docs/rules/one-var
		'semi': [2, 'never'], // https://eslint.org/docs/rules/semi
		'keyword-spacing': 2, // https://eslint.org/docs/rules/keyword-spacing
		'space-before-blocks': 2, // https://eslint.org/docs/rules/space-before-blocks
		'space-before-function-paren': [2, {anonymous: 'always', named: 'never', asyncArrow: 'always'}], // https://eslint.org/docs/rules/space-before-function-paren
		'space-infix-ops': 2, // https://eslint.org/docs/rules/space-infix-ops
		'spaced-comment': [2, 'always', {markers: ['global', 'eslint']}], // https://eslint.org/docs/rules/spaced-comment
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			parser: '@typescript-eslint/parser',
			parserOptions: {
				ecmaVersion: 2018,
				sourceType: 'module',
			},
			plugins: ['@typescript-eslint/eslint-plugin'],
			rules: {
				'@typescript-eslint/ban-types': 2,
				'@typescript-eslint/no-unused-vars': [1, {argsIgnorePattern: '^_'}],
			},
		},
	],
	ignorePatterns: [
		'jest.config.js',
		'commitlint.config.js',
		'packages/**/dist',
	],
}

