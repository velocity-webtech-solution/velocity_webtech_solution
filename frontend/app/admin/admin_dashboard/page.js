"use client";

import {
  ArrowUpRight,
  BellRing,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  ShieldCheck,
  UserCog,
  UsersRound,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window.sessionStorage.getItem("velocity_admin_user");

    if (!storedUser) {
      router.replace("/admin");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      window.sessionStorage.removeItem("velocity_admin_user");
      router.replace("/admin");
    }
  }, [router]);

  function handleLogout() {
    window.sessionStorage.removeItem("velocity_admin_user");
    router.replace("/admin");
  }

  const userEmail = user?.email || "Superuser access verified";

  return (
    <main className="admin-dashboard-page">
      <div className="admin-dashboard-shell">
        <aside className="admin-sidebar">
          <a className="admin-sidebar-brand" href="/velocity_webtech_solution/">
            <img
              src="/velocity_webtech_solution/image/logo_new.gif"
              alt="Velocity Webtech Solution"
            />
            <span>Velocity Admin</span>
          </a>

          <nav className="admin-sidebar-nav" aria-label="Admin navigation">
            <a className="active" href="/velocity_webtech_solution/admin/admin_dashboard/">
              <LayoutDashboard size={18} />
              Dashboard
            </a>
            <a href="http://127.0.0.1:8000/api/admin/velocity_webtech/contactsubmission/">
              <Mail size={18} />
              Enquiries
            </a>
            <a href="http://127.0.0.1:8000/api/admin/auth/user/">
              <UsersRound size={18} />
              Users
            </a>
            <a href="/velocity_webtech_solution/">
              <Home size={18} />
              Website
            </a>
          </nav>
        </aside>

        <section className="admin-dashboard-content">
          <header className="admin-dashboard-header">
            <div>
              <span>
                <LayoutDashboard size={22} />
              </span>
              <div>
                <p>Velocity Webtech Solution</p>
                <h1>Admin Dashboard</h1>
              </div>
            </div>

            <div className="admin-header-actions">
              <a href="http://127.0.0.1:8000/api/admin/" target="_blank">
                Django Admin
                <ArrowUpRight size={17} />
              </a>
              <button type="button" onClick={handleLogout}>
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </header>

          <section className="admin-welcome-panel">
            <div>
              <p>Welcome back</p>
              <h2>{user?.username || "Admin"}</h2>
              <span>{userEmail}</span>
            </div>
            <div className="admin-access-badge">
              <ShieldCheck size={20} />
              Superuser Verified
            </div>
          </section>

          <section className="admin-stat-grid" aria-label="Dashboard status">
            <article>
              <span>
                <Mail size={21} />
              </span>
              <p>Contact Leads</p>
              <strong>Ready</strong>
            </article>
            <article>
              <span>
                <BellRing size={21} />
              </span>
              <p>Email Alerts</p>
              <strong>Enabled</strong>
            </article>
            <article>
              <span>
                <UserCog size={21} />
              </span>
              <p>Account Role</p>
              <strong>Admin</strong>
            </article>
            <article>
              <span>
                <ShieldCheck size={21} />
              </span>
              <p>Access Level</p>
              <strong>Secure</strong>
            </article>
          </section>

          <section className="admin-workspace-grid">
            <article className="admin-dashboard-card">
              <div className="admin-card-heading">
                <div>
                  <p>Quick actions</p>
                  <h2>Manage Website Data</h2>
                </div>
              </div>

              <div className="admin-action-list">
                <a href="http://127.0.0.1:8000/api/admin/velocity_webtech/contactsubmission/">
                  <span>
                    <Mail size={19} />
                  </span>
                  <div>
                    <strong>Contact enquiries</strong>
                    <small>Review submitted project requests</small>
                  </div>
                  <ArrowUpRight size={17} />
                </a>
                <a href="http://127.0.0.1:8000/api/admin/auth/user/">
                  <span>
                    <UsersRound size={19} />
                  </span>
                  <div>
                    <strong>User management</strong>
                    <small>Manage Django users and permissions</small>
                  </div>
                  <ArrowUpRight size={17} />
                </a>
                <a href="/velocity_webtech_solution/">
                  <span>
                    <Home size={19} />
                  </span>
                  <div>
                    <strong>Open website</strong>
                    <small>Go back to the public homepage</small>
                  </div>
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </article>

            <article className="admin-dashboard-card admin-system-card">
              <div className="admin-card-heading">
                <div>
                  <p>System status</p>
                  <h2>Admin Access</h2>
                </div>
              </div>

              <div className="admin-system-list">
                <div>
                  <span>Session</span>
                  <strong>Active</strong>
                </div>
                <div>
                  <span>Permission</span>
                  <strong>Superuser</strong>
                </div>
                <div>
                  <span>Dashboard route</span>
                  <strong>/admin/admin_dashboard</strong>
                </div>
              </div>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}
