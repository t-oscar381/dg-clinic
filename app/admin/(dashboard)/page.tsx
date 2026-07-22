import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — DG Clinic",
  robots: { index: false, follow: false },
};

export default function AdminOverviewPage() {
  return (
    <div className="admin-overview">
      <h1>Overview</h1>
      <p>Manage the website's editable copy and blog posts from here.</p>
      <div className="admin-overview__grid">
        <Link href="/admin/content" className="admin-overview__card">
          <h2>Site Content</h2>
          <p>Edit hero text, headlines, and copy blocks across the site.</p>
        </Link>
        <Link href="/admin/posts" className="admin-overview__card">
          <h2>Blog / News</h2>
          <p>Write, edit, and publish blog or news posts.</p>
        </Link>
        <Link href="/admin/finance-simulator" className="admin-overview__card">
          <h2>Finance Simulator</h2>
          <p>Internal cart → Paper.id (simulated) → receipt tool.</p>
        </Link>
      </div>
    </div>
  );
}
