"use client";

import {
  Bell,
  ChevronDown,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  UserRound,
  UsersRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

const pageTitles = {
  [`${BASE_PATH}/admin/dashboard/`]: {
    title: "Admin Dashboard",
    current: "Dashboard",
  },
  [`${BASE_PATH}/admin/enquiries/`]: {
    title: "Website Enquiries",
    current: "Enquiries",
  },
};

export default function AdminShell({ children }) {
  const pathname = usePathname();
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

  const header = useMemo(() => {
    const pathWithBase = pathname.startsWith(BASE_PATH)
      ? pathname
      : `${BASE_PATH}${pathname}`;
    const normalizedPath = pathWithBase.endsWith("/")
      ? pathWithBase
      : `${pathWithBase}/`;

    return (
      pageTitles[normalizedPath] || {
        title: "Admin Dashboard",
        current: "Dashboard",
      }
    );
  }, [pathname]);

  function handleLogout() {
    window.sessionStorage.removeItem("velocity_admin_user");
    router.replace("/admin");
  }

  return (
    <main className="admin-dashboard-page admin-enquiries-page">
      <div className="admin-dashboard-shell">
        <aside className="admin-sidebar">
          <a className="admin-sidebar-brand" href={`${BASE_PATH}/`}>
            <img
              src={`${BASE_PATH}/image/logo_new.gif`}
              alt="Velocity Webtech Solution"
            />
            <span>Velocity Admin</span>
          </a>

          <nav className="admin-sidebar-nav" aria-label="Admin navigation">
            <a
              className={header.current === "Dashboard" ? "active" : ""}
              href={`${BASE_PATH}/admin/dashboard/`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </a>
            <a
              className={header.current === "Enquiries" ? "active" : ""}
              href={`${BASE_PATH}/admin/enquiries/`}
            >
              <Mail size={18} />
              Enquiries
            </a>
            <a href="http://127.0.0.1:8000/api/admin/auth/user/">
              <UsersRound size={18} />
              Users
            </a>
            <a href={`${BASE_PATH}/`}>
              <Home size={18} />
              Website
            </a>
          </nav>
        </aside>

        <section className="admin-enquiries-content">
          <header className="enquiries-topbar">
            <div>
              <h1>{header.title}</h1>
              <nav aria-label="Breadcrumb">
                <a href={`${BASE_PATH}/admin/dashboard/`}>Dashboard</a>
                <span>/</span>
                <strong>{header.current}</strong>
              </nav>
            </div>

            <div className="enquiries-userbar">
              <button type="button" aria-label="Notifications">
                <Bell size={19} />
                <span>8</span>
              </button>
              <div className="enquiries-avatar">
                <UserRound size={18} />
              </div>
              <div>
                <strong>{user?.username || "Admin User"}</strong>
                <span>Admin</span>
              </div>
              <ChevronDown size={16} />
              <button type="button" onClick={handleLogout} aria-label="Logout">
                <LogOut size={18} />
              </button>
            </div>
          </header>

          {children}
        </section>
      </div>
    </main>
  );
}
