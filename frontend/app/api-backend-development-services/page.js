import { createPageMetadata } from "../../lib/seo";
import ServicePricingDetail from "../services-pricing/ServicePricingDetail";

export const metadata = createPageMetadata("/api-backend-development-services/");

export default function ApiBackendDevelopmentServicesPricingPage() {
  return <ServicePricingDetail serviceId="api-backend-development" />;
}
