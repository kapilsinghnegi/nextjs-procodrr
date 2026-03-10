export const metadata = {
  title: { template: "%s | My App", default: "Services" },
};

export default function ServicesLayout({ children }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">All Services</h2>
      {children}
    </div>
  );
}
