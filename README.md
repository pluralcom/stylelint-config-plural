# Plural's Javascript Styleguide

🎨 How plural paints its styles.

[![npm version](https://badge.fury.io/js/stylelint-config-plural.svg)](https://badge.fury.io/js/stylelint-config-plural) [![Test Release Publish](https://github.com/pluralcom/stylelint-config-plural/actions/workflows/test-publish.yml/badge.svg)](https://github.com/pluralcom/stylelint-config-plural/actions/workflows/test-publish.yml)

Extends:

- [`stylelint-config-standard`](https://github.com/stylelint/stylelint-config-standard).
- [`stylelint-config-standard-scss`](https://github.com/stylelint/stylelint-config-standard-scss).
- [`stylelint-config-prettier`](https://github.com/stylelint/stylelint-config-prettier).

Turns on additional rules to enforce common conventions found in the specifications and in a handful of CSS styleguides, including: [BEM CSS](https://en.bem.info/methodology/css).

It favors flexibility over strictness for things like multi-line lists and single-line rulesets.

To see the rules that this config uses, please read the [config itself](./index.js).

## Example

<!-- prettier-ignore -->
```css
@import "x";
@import "y";

/**
 * Multi-line comment
 */

:root {
  --brand-red: hsl(5deg 10% 40%);
}

.selector-1,
.selector-2,
.selector-3[type="text"] {
  background: linear-gradient(#fff, rgb(0 0 0 / 80%));
  box-sizing: border-box;
  display: block;
  color: var(--brand-red);
}

.selector-a,
.selector-b:not(:first-child) {
  padding: 10px !important;
  top: calc(100% - 2rem);
}

.selector-x { width: 10%; }
.selector-y { width: 20%; }
.selector-z { width: 30%; }

/* Single-line comment */

@media (width >= 60em) {
  .selector {
    /* Flush to parent comment */
    transform: translate(1, 1) scale(3);
  }
}

@media (orientation: portrait), projection and (color) {
  .selector-i + .selector-ii {
    background: hsl(20deg 25% 33%);
    font-family: Helvetica, "Arial Black", sans-serif;
  }
}

/* Flush single line comment */
@media
  screen and (min-resolution: 192dpi),
  screen and (min-resolution: 2dppx) {
  .selector {
    animation: 3s none fade-in;
    background-image:
      repeating-linear-gradient(
        -45deg,
        transparent,
        #fff 25px,
        rgb(255 255 255 / 100%) 50px
      );
    margin: 10px;
    margin-bottom: 5px;
    box-shadow:
      0 1px 1px #000,
      0 1px 0 #fff,
      2px 2px 1px 1px #ccc inset;
    height: 10rem;
  }

  /* Flush nested single line comment */
  .selector::after {
    content: "→";
    background-image: url("x.svg");
  }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

_Note: the config is tested against this example, as such the example contains plenty of CSS syntax, formatting and features._

## Installation

```bash
npm install stylelint-config-plural --save-dev
```

## Usage

Set your stylelint config to:

```json
{
  "extends": "stylelint-config-plural"
}
```

### Extending the config

Add a `"rules"` key to your config, then add your overrides and additions there.

You can turn off rules by setting its value to `null`. For example:

```json
{
  "extends": "stylelint-config-plural",
  "rules": {
    "selector-class-pattern": null
  }
}
```

Or lower the severity of a rule to a warning using the `severity` secondary option. For example:

```json
{
  "extends": "stylelint-config-plural",
  "rules": {
    "property-no-vendor-prefix": [
      true,
      {
        "severity": "warning"
      }
    ]
  }
}
```

A more complete example, to change the `at-rule-no-unknown` rule to use its `ignoreAtRules` option, change the `indentation` to tabs, turn off the `number-leading-zero` rule, set the severity of the `number-max-precision` rule to `warning`, and add the `unit-allowed-list` rule:

```json
{
  "extends": "stylelint-config-plural",
  "rules": {
    "at-rule-no-unknown": [
      true,
      {
        "ignoreAtRules": ["--my-at-rule"]
      }
    ],
    "indentation": "tab",
    "number-leading-zero": null,
    "number-max-precision": [
      4,
      {
        "severity": "warning"
      }
    ],
    "unit-allowed-list": ["em", "rem", "s"]
  }
}
```

## Improving this config

Consider adding test cases if you're making complicated rules changes, like anything involving regexes. Perhaps in a distant future, we could use literate programming to structure our README as test cases for our .eslintrc?

You can run tests with `npm test`.

You can make sure this module lints with itself using `npm run lint`.

## [Changelog](https://github.com/pluralcom/stylelint-config-plural/releases)

## [License](LICENSE)

<hr>

This Package is being maintained by [plural](https://plural.com)
