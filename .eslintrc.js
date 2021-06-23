module.exports = {
	'root': true,
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'env': {
		'es6': true,
		'node': true
	},
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'sourceType': 'script',
		'ecmaVersion': 8
	},
	'rules': {
		/* Rules found at: http://eslint.org/docs/rules/ */
		/* Possible errors */
		'no-extra-parens': 'warn',
		'no-var': 'error',
		'no-template-curly-in-string': 'error',

		/* Best Practices */
		'eqeqeq': 'error',
		'no-else-return': 'warn',
		'no-empty-function': 'error',
		'no-eq-null': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-extra-bind': 'error',
		'no-extra-label': 'error',
		'no-fallthrough': 'error',
		'no-implied-eval': 'error',
		'no-invalid-this': 'error',
		'no-lone-blocks': 'error',
		'no-loop-func': 'error',
		'no-magic-numbers': [
			'warn',
			{
				'ignore': [-1, 0, 1],
				'ignoreArrayIndexes': true
			}
		],
		'no-multi-spaces': 'warn',
		'no-new': 'error',
		'no-return-assign': 'error',
		'no-self-compare': 'error',
		'no-sequences': 'error',
		'no-throw-literal': 'warn',
		'no-unmodified-loop-condition': 'error',
		'no-unused-expressions': 'error',
		'no-useless-call': 'warn',
		'no-useless-concat': 'warn',
		'no-useless-escape': 'error',
		'no-useless-return': 'error',
		'no-with': 'error',
		'prefer-promise-reject-errors': 'error',
		'yoda': 'warn',

		/* Variables */
		'no-shadow': 'error',
		'no-use-before-define': 'error',

		/* Node.js and CommonJS */
		'callback-return': [
			'error',
			['callback', 'cb']
		],
		'no-new-require': 'warn',

		/* Stylistic issues */
		'block-spacing': ['warn', 'always'],
		'brace-style': [
			'warn',
			'1tbs',
			{
				'allowSingleLine': true
			}
		],
		'camelcase': 'warn',
		'comma-dangle': ['warn', 'never'],
		'comma-spacing': [
			'warn',
			{
				'before': false,
				'after': true
			}
		],
		'func-call-spacing': ['warn', 'never'],
		'indent': [
			'warn',
			'tab',
			{
				'SwitchCase': 1
			}
		],
		'linebreak-style': [
			'error',
			'unix'
		],
		'no-multiple-empty-lines': 'warn',
		'no-lonely-if': 'warn',
		'quotes': [
			'warn',
			'single'
		],
		'eol-last': [
			'error',
			'always'
		],
		'dot-notation': [
			'error',
			{
				'allowPattern': '_'
			}
		],
		/* ECMAScript 6 */
		'prefer-const': 'warn'
	},
	'plugins': [
		'@typescript-eslint'
	]
};
