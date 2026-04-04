# Setting up Lint Staged in Next.js

When we lint and format our code, it checks and format one-by-one and in smaller projects it is fast but in bigger projects, it takes a lot of time. That's why we use [`lint-staged`](https://nextjs.org/docs/app/api-reference/config/eslint). It is a practice of linting and formatting staged files only and ignore the rest. To setup, lint-staged, will install it as a devDependency.

```bash
npm install --save-dev lint-staged
```

and then we will create a new file `.lintstagedrc.js` in our project's root and it will contain the following code:

```js
const path = require("path");

const buildEslintCommand = filenames =>
  `eslint --fix ${filenames
    .map(f => `"${path.relative(process.cwd(), f)}"`)
    .join(" ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
};
```

To run lint-staged, we can run `npx lint-staged` in our terminal.
