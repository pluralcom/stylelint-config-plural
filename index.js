'use strict';

const propertyOrder = require('./rules/property-order');

/** Root Stylelint configuration */
module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-standard-scss',
		'stylelint-config-prettier',
	],
	plugins: ['stylelint-order'],
	/**
	 * Global Rules
	 *
	 * Development notes:
	 * - you can add more rules here in alphabetic order.
	 */
	rules: {
		/* CSS */
		/** use long to match JS */
		'color-hex-length': 'long',
		/** properties order */
		'order/properties-order': propertyOrder,
		/** allow us to go as precise as needed */
		'number-max-precision': null,
		/** eg: composes - scss */
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['composes', 'compose-with'],
			},
		],
		/** selector class pattern must match [BEM CSS](https://en.bem.info/methodology/css) - [Regex](https://regexr.com/3apms) */
		'selector-class-pattern': [
			'^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$',
			{
				/** This option will resolve nested selectors with & interpolation. - https://stylelint.io/user-guide/rules/selector-class-pattern/#resolvenestedselectors-true--false-default-false */
				resolveNestedSelectors: true,
				/** Custom message */
				message: function expected(selectorValue) {
					return `Expected class selector "${selectorValue}" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms`;
				},
			},
		],
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['local', 'global'],
			},
		],
		/* SCSS */
		/** temporary - eg: @extends .t1 - @todo, investigate % selector. */
		'scss/at-extend-no-missing-placeholder': null,
		/** eg: importing bootstrap */
		'scss/at-import-no-partial-leading-underscore': null,
		/** Expected map.get instead of map-get - map.get misbehaves with Create React App */
		'scss/no-global-function-names': null,
	},
};
