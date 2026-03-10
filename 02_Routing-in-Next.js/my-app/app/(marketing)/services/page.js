import Link from "next/link";

export default function Services() {
  return (
    <div>
      <p>
        <Link href="/services/app-dev">App Development</Link>
      </p>
      <p>
        <Link href="/services/web-dev">Web Development</Link>
      </p>
      <p>
        <Link href="/services/seo">SEO</Link>
      </p>
    </div>
  );
}
