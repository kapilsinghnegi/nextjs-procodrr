// import ThemeProvider from "@/context/ThemeContext";
import "./globals.css";
import StoreProvider from "./StoreProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body>
        {/* <ThemeProvider>{children}</ThemeProvider> */}
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}

