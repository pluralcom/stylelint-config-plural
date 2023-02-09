'use strict';

const propertyOrder = require('./rules/property-order');

/** Root Stylelint configuration */
module.exports = {
	extends: [
		'stylelint-config-standard',
		'stylelint-config-standard-scss',
		'stylelint-8-point-grid',
		'stylelint-config-prettier',
	],
	plugins: [
		'stylelint-high-performance-animation',
		'stylelint-images',
		'stylelint-rem-over-px',
		'stylelint-order',
	],
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
		/** images */
		'images/broken': true,
		// /** allow us to go as precise as needed */
		// 'number-max-precision': null,
		/** no px - enforce rem */
		'rem-over-px/rem-over-px': [
			true,
			{
        fontSize: 16,
				ignore: ['1px'],
				ignoreFunctions: ['rem'],
			},
		],
		/** properties order */
		'order/properties-order': propertyOrder,
		// /** 8 point grid system - 4 point base and 8 point main grid system */
		'plugin/8-point-grid': {
			/** base grid point 4 so we can use 4 in certain scenarios and 8 in most. */
			base: 4,
			/** special case allow for 1 and 2 points in px and rem, units can be enabled/disabled using other rules */
			allowlist: ['1px', '2px', '0.0625rem', '0.125rem'],
			/** custom properties */
			customProperties: ['size'],
		},
		/** now low performance animation properties */
		'plugin/no-low-performance-animation-properties': true,
		/** eg: composes - css modules */
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
