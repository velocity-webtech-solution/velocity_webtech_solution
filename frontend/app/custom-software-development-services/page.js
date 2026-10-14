import { createPageMetadata } from "../../lib/seo";
import ServicePricingDetail from "../services-pricing/ServicePricingDetail";

export const metadata = createPageMetadata("/custom-software-development-services/");

export default function CustomSoftwareDevelopmentServicesPricingPage() {
  return <ServicePricingDetail serviceId="custom-software-development" />;
}
