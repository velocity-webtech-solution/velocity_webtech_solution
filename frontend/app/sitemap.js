import { SITE_URL } from "../lib/seo";

export const dynamic = "force-static";

const routes = [
  "",
  "api-backend-development-services",
  "cloud-deployment-services",
  "crm-erp-business-management-systems-services",
  "custom-software-development-services",
  "domain-hosting-assistance-services",
  "e-commerce-development-services",
  "mobile-app-development-services",
  "portfolio",
  "services-pricing",
  "software-training-services",
  "ui-ux-design-services-pricing",
  "website-development-services",
  "website-software-maintenance-services",
];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${SITE_URL}/${route ? `${route}/` : ""}`,
    changeFrequency: "monthly",
    priority: route ? 0.8 : 1,
  }));
}
