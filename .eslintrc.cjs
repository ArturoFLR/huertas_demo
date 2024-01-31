module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react/jsx-runtime"
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint"],
	rules: {
		"react/react-in-jsx-scope": "off",
		"react/jsx-uses-react": "off",
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
	},
};
