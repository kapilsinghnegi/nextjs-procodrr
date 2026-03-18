"use client"; // <--- important to mark this as a Client Component

import Link from "next/link";
import { usePathname } from "next/navigation"; // for checking current route
import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";
import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function Header() {
  const pathname = usePathname();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem("isDark", isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);
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
            href="/blogs"
            className={pathname === "/blogs" ? "nav-link active" : "nav-link"}
          >
            Blogs
          </Link>
        </li>
      </ul>

      <button onClick={toggleTheme}>
        {isDark ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
}
