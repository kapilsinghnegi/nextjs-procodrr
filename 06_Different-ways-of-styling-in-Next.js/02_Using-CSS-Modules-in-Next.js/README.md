# CSS Modules in Next.js

CSS Modules are used when we want to create unique styles for each component. To create a file, we extend the `.module.css` extension. These files do not export normal CSS. Instead, they export JavaScript objects that contain the class names.

If we style element-selectors in these files, then the styles will be scoped globally like Normal CSS. In case of classes, then the styles will be scoped locally and to use those classes, we have to import an object `styles, this name can be anything and we can use the class name as a key to access the class name. We can also destructure the object and use the class name directly but it is not the best practice.
