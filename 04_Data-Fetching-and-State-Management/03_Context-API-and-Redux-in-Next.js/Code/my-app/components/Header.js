"use client"; // <--- important to mark this as a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation"; // for checking current route
import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { toggleTheme } from "@/lib/themeSlice";
// import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const pathname = usePathname();
  // const { isDark, toggleTheme } = useTheme();
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
      <ul>
        <li>
          <Link
            href="/"
            className={pathname === "/" ? "nav-link active" : "nav-link"}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={pathname === "/about" ? "nav-link active" : "nav-link"}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/services"
            className={
              pathname === "/services" ? "nav-link active" : "nav-link"
            }
          >
            Services
          </Link>
        </li>
      </ul>

      <button onClick={() => dispatch(toggleTheme())}>
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
}
