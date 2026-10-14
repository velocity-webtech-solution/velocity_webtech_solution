import { createPageMetadata } from "../../lib/seo";
import ServicePricingDetail from "../services-pricing/ServicePricingDetail";

export const metadata = createPageMetadata("/website-development-services/");

export default function WebsiteDevelopmentServicesPricingPage() {
  return <ServicePricingDetail serviceId="website-development" />;
}
