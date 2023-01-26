'use strict';

const config = require('../');
const fs = require('fs');
const stylelint = require('stylelint');

describe('css', () => {
	describe('flags no warnings with valid css', () => {
		const validCss = fs.readFileSync('./__tests__/valid.css', 'utf-8');
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: validCss,
				config,
			});
		});

		it('did not error', () => {
			expect(result.errored).toBe(false);
		});

		it('flags no warnings', () => {
			expect(result.results[0].warnings).toHaveLength(0);
		});
	});

	describe('flags warnings with invalid css', () => {
		const invalidCss = fs.readFileSync('./__tests__/invalid.css', 'utf-8');
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: invalidCss,
				config,
			});
		});

		it('did error', () => {
			expect(result.errored).toBe(true);
		});

		it('flags warnings', () => {
			expect(result.results[0].warnings).toHaveLength(6);
		});

		it('correct warning text', () => {
			expect(result.results[0].warnings.map((w) => w.text)).toEqual([
				'Expected "color" to come before "background-color" (order/properties-order)',
				'Expected custom media query name "--FOO" to be kebab-case',
				'Expected custom property name "--FOO" to be kebab-case',
				'Expected keyframe name "FOO" to be kebab-case',
				'Expected class selector ".FOO" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms',
				'Expected id selector "#FOO" to be kebab-case',
			]);
		});

		it('correct rule flagged', () => {
			expect(result.results[0].warnings.map((w) => w.rule)).toEqual([
				'order/properties-order',
				'custom-media-pattern',
				'custom-property-pattern',
				'keyframes-name-pattern',
				'selector-class-pattern',
				'selector-id-pattern',
			]);
		});

		it('correct severity flagged', () => {
			expect(result.results[0].warnings[0].severity).toBe('error');
		});

		it('correct line number', () => {
			expect(result.results[0].warnings[0].line).toBe(17);
		});

		it('correct column number', () => {
			expect(result.results[0].warnings[0].column).toBe(3);
		});
	});
});

describe('scss', () => {
	describe('flags no warnings with valid scss', () => {
		const validScss = fs.readFileSync('./__tests__/valid.scss', 'utf-8');
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: validScss,
				config,
			});
		});

		it('did not error', () => {
			expect(result.errored).toBe(false);
		});

		it('flags no warnings', () => {
			expect(result.results[0].warnings).toHaveLength(0);
		});
	});

	describe('flags warnings with invalid scss', () => {
		const invalidScss = fs.readFileSync('./__tests__/invalid.scss', 'utf-8');
		let result;

		beforeEach(async () => {
			result = await stylelint.lint({
				code: invalidScss,
				config,
			});
		});

		it('did error', () => {
			expect(result.errored).toBe(true);
		});

		it('flags warnings', () => {
			expect(result.results[0].warnings).toHaveLength(7);
		});

		it('correct warning text', () => {
			expect(result.results[0].warnings.map((w) => w.text)).toEqual([
				'Expected "color" to come before "background-color" (order/properties-order)',
				'Expected custom media query name "--FOO" to be kebab-case',
				'Expected custom property name "--FOO" to be kebab-case',
				'Expected keyframe name "FOO" to be kebab-case',
				'Expected class selector ".FOO" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms',
				'Expected class selector ".bem__not_bem" to match BEM CSS pattern https://en.bem.info/methodology/css. Selector validation tool: https://regexr.com/3apms',
				'Expected id selector "#FOO" to be kebab-case',
			]);
		});

		it('correct rule flagged', () => {
			expect(result.results[0].warnings.map((w) => w.rule)).toEqual([
				'order/properties-order',
				'custom-media-pattern',
				'custom-property-pattern',
				'keyframes-name-pattern',
				'selector-class-pattern',
				'selector-class-pattern',
				'selector-id-pattern',
			]);
		});

		it('correct severity flagged', () => {
			expect(result.results[0].warnings[0].severity).toBe('error');
		});

		it('correct line number', () => {
			expect(result.results[0].warnings[0].line).toBe(23);
		});

		it('correct column number', () => {
			expect(result.results[0].warnings[0].column).toBe(3);
		});
	});
});
