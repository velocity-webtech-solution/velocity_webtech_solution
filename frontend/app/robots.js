import { SITE_URL } from "../lib/seo";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
