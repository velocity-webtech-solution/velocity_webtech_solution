"use client";

import { useEffect } from "react";

const DJANGO_ADMIN_URL =
  process.env.NEXT_PUBLIC_DJANGO_ADMIN_URL ||
  "http://127.0.0.1:8000/velocity_webtech_solution/api/admin/";

export default function DjangoAdminRedirectPage() {
  useEffect(() => {
    window.location.replace(DJANGO_ADMIN_URL);
  }, []);

  return (
    <main className="django-admin-redirect-page">
      <section>
        <h1>Opening Django Admin</h1>
        <p>Please wait while we redirect you to the Django admin panel.</p>
        <a href={DJANGO_ADMIN_URL}>Open Django Admin</a>
      </section>
    </main>
  );
}
