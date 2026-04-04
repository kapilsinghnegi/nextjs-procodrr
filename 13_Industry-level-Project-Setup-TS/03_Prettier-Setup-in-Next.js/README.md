# Prettier Setup in Next.js

To install [Prettier](https://prettier.io/docs/), we will run : `npm install --save-dev --save-exact prettier` in our terminal and then we will follow [these instructions](https://prettier.io/docs/install)

To check, we will run : `npx prettier . --check` and to format, we will run : `npx prettier . --write`

To exclude files from formatting, create a .prettierignore file in the root of your project. .prettierignore uses gitignore syntax.

For configuring Prettier, we have [Prettier configuration file](https://prettier.io/docs/configuration) and we can change [options](https://prettier.io/docs/options) as per our needs.

We can install Prettier extension in VSCode for auto-formatting.

To turn off all rule that conflict or are unnecessary with [Prettier](https://prettier.io/docs/integrating-with-linters), we can use [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier)

For [Automatic Class Sorting with Prettier](https://tailwindcss.com/blog/automatic-class-sorting-with-prettier), we install prettier-plugin-tailwindcss as a dev-dependency:

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

Then add the plugin to your Prettier configuration file:

```js
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```
