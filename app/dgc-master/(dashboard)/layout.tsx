import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LOGO_SRC } from "@/lib/site";
import AdminSidebarNav from "@/components/admin/AdminSidebarNav";
import SignOutButton from "@/components/admin/SignOutButton";

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
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-sidebar__brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO_SRC} alt="" className="admin-sidebar__logo" />
          <div>
            <p className="admin-sidebar__title">DG Clinic</p>
            <p className="admin-sidebar__subtitle">Admin</p>
          </div>
        </div>

        <AdminSidebarNav />

        <div className="admin-sidebar__footer">
          <p className="admin-sidebar__user" title={user.email}>
            {user.email}
          </p>
          <SignOutButton />
        </div>
      </aside>

      <main className="admin-main">
        <div className="admin-main__body">{children}</div>
      </main>
    </div>
  );
}
