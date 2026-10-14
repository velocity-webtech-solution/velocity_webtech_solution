import { createPageMetadata } from "../../lib/seo";
import ServicePricingDetail from "../services-pricing/ServicePricingDetail";

export const metadata = createPageMetadata("/e-commerce-development-services/");

export default function EcommerceDevelopmentServicesPricingPage() {
  return <ServicePricingDetail serviceId="e-commerce-development" />;
}
