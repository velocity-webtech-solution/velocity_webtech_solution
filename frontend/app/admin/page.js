"use client";

import {
  ArrowRight,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminLogin } from "../api/apiservice";

const BASE_PATH = "";

export default function AdminLoginPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });

    const formData = new FormData(event.currentTarget);

    try {
      const response = await adminLogin({
        username: formData.get("username"),
        password: formData.get("password"),
      });

      if (response.is_superuser) {
        window.sessionStorage.setItem(
          "velocity_admin_user",
          JSON.stringify(response.user),
        );
        router.push("/admin/dashboard");
        return;
      }

      setStatus({
        type: "error",
        message: "Only superusers can access this dashboard.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message || "Unable to login.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="admin-login-page">
      <section className="admin-login-shell" aria-label="Velocity admin login">
        <div className="admin-login-brand-panel">
          <div className="admin-brand-mark">
            <Image
              className="admin-login-logo"
              src={`${BASE_PATH}/image/logo_new.gif`}
              alt="Velocity Webtech Solution logo"
              width={72}
              height={72}
              priority
            />
          </div>

          <div className="admin-brand-copy">
            <p>Velocity Webtech Solution</p>
            <h2>Admin Control Center</h2>
            <span>
              Manage enquiries, users, and website operations from one focused
              workspace.
            </span>
          </div>

          <div className="admin-login-highlights" aria-label="Admin highlights">
            <div>
              <ShieldCheck size={20} />
              <span>Superuser Access</span>
            </div>
            <div>
              <Sparkles size={20} />
              <span>Clean Dashboard</span>
            </div>
          </div>
        </div>

        <form className="admin-login-card" onSubmit={handleSubmit}>
          <div className="admin-login-heading">
            <span>
              <ShieldCheck className="admin-login-heading-icon" size={24} />
              <Image
                className="admin-login-heading-logo"
                src={`${BASE_PATH}/image/logo_new.gif`}
                alt="Velocity Webtech Solution logo"
                width={48}
                height={48}
                priority
              />
            </span>
            <div>
              <p>Velocity Admin</p>
              <h1>Admin Login</h1>
            </div>
          </div>

          <label>
            Username
            <div className="admin-input-wrap">
              <UserRound size={18} />
              <input
                type="text"
                name="username"
                autoComplete="username"
                placeholder="Enter admin username"
                required
              />
            </div>
          </label>

          <label>
            Password
            <div className="admin-input-wrap">
              <LockKeyhole size={18} />
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter password"
                required
              />
            </div>
          </label>

          {status.message && (
            <p className={`form-status ${status.type}`}>{status.message}</p>
          )}

          <button type="submit" disabled={submitting}>
            {submitting ? "Checking..." : "Login"}
            <ArrowRight className="admin-login-button-icon" size={18} />
          </button>
        </form>
      </section>
    </main>
  );
}
