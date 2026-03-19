# Adding Styles in Next.js using CSS

If a CSS file is linked with a page, it will be applied only when a user visits that page because that is when the css file is loaded. If a CSS file is linked with a component, it will be applied only when a user uses that component because that is when the css file is loaded. If we refresh the page, all the styles will be removed.

Import order, cascading order, and specificity matters when styles are applied.

Normal css files gets applied to all the pages. We should only use them when we want to style global elements.