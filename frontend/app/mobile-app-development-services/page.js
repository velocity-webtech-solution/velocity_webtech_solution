import { createPageMetadata } from "../../lib/seo";
import ServicePricingDetail from "../services-pricing/ServicePricingDetail";

export const metadata = createPageMetadata("/mobile-app-development-services/");

export default function MobileAppDevelopmentServicesPricingPage() {
  return <ServicePricingDetail serviceId="mobile-app-development" />;
}
