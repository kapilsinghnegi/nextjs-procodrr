import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | My App",
    default: "My App",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="px-4 py-2 bg-neutral-900 text-neutral-100 font-medium">
          My App
        </header>
        <div className="grow">{children}</div>
        <footer className="px-4 py-2 bg-neutral-900 text-neutral-100 font-medium text-center">&copy; My App 2026</footer>
      </body>
    </html>
  );
}

