# ESLint Deep Dive in Next.js

If multiple developers are working on a project, they follow different code stylings and our project will not follow a consistent styling. For solving this, we setup some tools and guidelines in Next.js so that all the developers automatically follow the same code styling, without manually setting up. We will learn how to do this in this section. If you are starting a new project, then you must enable all of the features in this section from the first day. If you are working on an existing project, then you can follow the steps in this section to setup all the features.

## What is a Linter?

A linter is a static code analysis tool that checks your source code for potential error, coding standard violations, and stylistic issues without running the code.

### Purpose of a Linter

- Identifying syntax errors
- Enforce coding style and consistency
- Highlight unused variables and unreachable code
- Catch potential bugs early
- Promote best practices

### How Linters Work

Linters parse your source code and apply a set of predefined or custom rules to flag problematic patterns. Most linters allow configuration files to customize rules and integarte with development tools like editors and build systems.

## What is ESLint?

ESLint is a popular open-source linter for JavaScript and TypeScript that helps developers identify and maintain code quality and consistency by analyzing for stylistic errors, potential bugs, and coding standards violations.

## Key Features of ESLint

- Supports ECMAScript 6+ and modern JavaScript features
- Highly configurable with `.eslintrc` or the new `eslint.config.js` flat config
- Allows custom rule definitions
- Supports plugin ecosystem (e.g. React, Next.js, Prettier integration)
- Works with most editors and IDEs

## Setup ESLint

1. Install ESLint and the Next.js config:

```bash
npm i -D eslint eslint-config-next
```

2. Create eslint.config.mjs with the Next.js config:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

3. Run ESLint:

```bash
npx eslint .
```
