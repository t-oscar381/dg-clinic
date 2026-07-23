import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/admin/SignOutButton";

const TABS = [
  { href: "/dgc-master", label: "Overview" },
  { href: "/dgc-master/content", label: "Site Content" },
  { href: "/dgc-master/posts", label: "Blog / News" },
  { href: "/dgc-master/knowledge", label: "Knowledge Bank" },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belt-and-suspenders: middleware already redirects unauthenticated
  // requests to /dgc-master/login, this covers the direct-render case too.
  if (!user) {
    redirect("/dgc-master/login");
  }

  return (
    <section className="section container sim-page">
      <div className="admin-shell">
        <header className="admin-shell__header">
          <div>
            <p className="admin-shell__eyebrow">DG Clinic Admin</p>
            <p className="admin-shell__user">{user.email}</p>
          </div>
          <SignOutButton />
        </header>

        <nav className="admin-tabs" aria-label="Admin sections">
          {TABS.map((tab) => (
            <Link key={tab.href} href={tab.href} className="admin-tabs__link">
              {tab.label}
            </Link>
          ))}
        </nav>

        <div className="admin-shell__body">{children}</div>
      </div>
    </section>
  );
}
