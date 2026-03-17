# Context API and Redux in Next.js

## Context API

To use the Context API in Next.js, you need to create a custom context and a custom context provider. We will make it a Client component because it will use React hooks.

```js
// context/ThemeContext.js
"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  useEffect(() => {
    setIsDark(localStorage.getItem("isDark") === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("isDark", isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// /app/layout.js
import ThemeProvider from "@/context/ThemeContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        // <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

## Redux

Firstly, we will create a Redux store and custom hooks to use it.

```js
// /lib/store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";

export const makeStore = () =>
  configureStore({ reducer: { theme: themeReducer } });

// /lib/hooks.js
import { useDispatch, useSelector } from "react-redux";

export const useAppDispatch = () => useDispatch();
export const useAppSelector = () => useSelector();
export const useAppStore = useStore.withTypes();
// /lib/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: localStorage?.getItem("theme") || "dark",
  },
  reducers: {
    toggleTheme: state => {
      state.value = state.value === "light" ? "dark" : "light";
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
```

Now, we will create a custom provider to provide the Redux store to the Next.js app.

```js
// /app/StoreProvider.js
"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/lib/store";

export default function StoreProvider({ children }) {
  const storeRef = useRef(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

// /app/layout.js
import "./globals.css";
import StoreProvider from "./StoreProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

// /app/components/Header.js
"use client"; // <--- important to mark this as a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation"; // for checking current route
import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { toggleTheme } from "@/lib/themeSlice";

export default function Header() {
  const pathname = usePathname();
  const theme = useAppSelector(state => state.theme.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <nav className="navbar">
      ...
      <button onClick={() => dispatch(toggleTheme())}>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
}
```
