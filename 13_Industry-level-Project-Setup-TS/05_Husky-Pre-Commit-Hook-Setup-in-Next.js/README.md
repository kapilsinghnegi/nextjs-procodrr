# Husky Pre-Commit Hook Setup in Next.js

Pre-commit hook provides us a way to execute a script before committing the code. `Husky` is a popular pre-commit hook tool which provides us a way to execute a script before committing the code.

To install [`Husky`](https://typicode.github.io/husky/get-started.html), we will run : `npm install --save-dev husky` in our terminal and then to initialize `Husky` we will run : `npx husky init`. This will create a `.husky` folder in our project and inside that folder we will have a `pre-commit` file. Inside that file, we will have our script which will be executed before committing the code.
