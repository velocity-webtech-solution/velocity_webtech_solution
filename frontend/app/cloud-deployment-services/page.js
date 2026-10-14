import { createPageMetadata } from "../../lib/seo";
import ServicePricingDetail from "../services-pricing/ServicePricingDetail";

export const metadata = createPageMetadata("/cloud-deployment-services/");

export default function CloudDeploymentServicesPricingPage() {
  return <ServicePricingDetail serviceId="cloud-deployment-services" />;
}
