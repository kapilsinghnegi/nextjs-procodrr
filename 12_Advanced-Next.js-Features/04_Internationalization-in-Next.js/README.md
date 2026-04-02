# Internationalization in Next.js

Internationalization, also known as i18n, is a technique for translating a website or application into multiple languages. The word `internationalization` has 18 letters between letter `i` and letter `n`. For implementing i18n in Next.js, we can use `next-intl` package.

We'll be using App Router here. To install the package, we can use `npm install next-intl`. After that, We'll be creating a structure like this:

```bash
├── messages
│   ├── en.json
│   └── ...
├── next.config.ts
└── src
    ├── i18n
    │   └── request.ts
    └── app
        ├── layout.tsx
        └── page.tsx
```

To setup the files, we'll create `messages/en.json` file `en` here is the language code.Messages represent the translations that are available per language and can be provided either locally or loaded from a remote data source.
The simplest option is to add JSON files in your local project folder:

```json
// @/messages/en.json
{
  "HomePage": {
    "title": "Hello world!"
  }
}
```

Then, `next-intl` creates a request-scoped configuration object, which you can use to provide messages and other options based on the user’s locale to Server Components. So, we'll create a file called `request.js` in the `i18n` directory.

```js
// @/i18n/request.js
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Static for now, we'll change this later
  const locale = "en";

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

Now, set up the plugin which links your i18n/request.ts file to next-intl.

```js
// @/next.config.js
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withNextIntl(nextConfig);
```

Now, To make your request configuration available to Client Components, you can wrap the children in your root layout with NextIntlClientProvider.

```js
// @/app/layout.js
import {NextIntlClientProvider} from 'next-intl';

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({children}: Props) {
  return (
    <html>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Now, Use translations in your page components or anywhere else!

```js
// @/app/page.js
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");
  return <h1>{t("title")}</h1>;
}

// In case of async components
// @/app/page.js
import {getTranslations} from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  return <h1>{t('title')}</h1>;
}
```

Next step, is to setup locale-based routing. next-intl integrates with Next.js’ routing system in two places:

1. Proxy / middleware: Negotiates the locale and handles redirects & rewrites (e.g. / → /en)
2. Navigation APIs: Lightweight wrappers around Next.js’ navigation APIs like <Link />

To get started with locale-based routing, we’ll set up the following files:
We’ll use routing.js as a central place to define our routing configuration:

```js
// @/i18n/routing.js
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "hi"],

  // Used when no locale matches
  defaultLocale: "en",
});
```

We'll move our layout, page to [locale] directory. 
