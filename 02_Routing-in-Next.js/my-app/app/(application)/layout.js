export const metadata = {
  title: {
    template: "%s | My App",
    default: "My App",
  },
};

export default function AppLayout({ children }) {
  return (
    <>
      <header className="px-4 py-2 bg-neutral-900 text-neutral-100 font-medium">
        Application - My App
      </header>
      {children}
      <footer className="px-4 py-2 bg-neutral-900 text-neutral-100 font-medium text-center">
        &copy; My App 2026
      </footer>
    </>
  );
}

