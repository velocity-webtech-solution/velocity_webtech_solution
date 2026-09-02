"use client";

import {
  ArrowUpRight,
  BellRing,
  Home,
  Mail,
  ShieldCheck,
  UserCog,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import AdminShell from "../AdminShell";

export default function AdminDashboardPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = window.sessionStorage.getItem("velocity_admin_user");

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      setUser(null);
    }
  }, []);

  const userEmail = user?.email || "Superuser access verified";

  return (
    <AdminShell>
    <div className="admin-dashboard-content">
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
            <a href="/velocity_webtech_solution/admin/enquiries/">
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
              <strong>/admin/dashboard</strong>
            </div>
          </div>
        </article>
      </section>
    </div>
    </AdminShell>
  );
}
