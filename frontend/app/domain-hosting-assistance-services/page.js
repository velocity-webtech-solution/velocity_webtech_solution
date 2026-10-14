import { createPageMetadata } from "../../lib/seo";
import ServicePricingDetail from "../services-pricing/ServicePricingDetail";

export const metadata = createPageMetadata("/domain-hosting-assistance-services/");

export default function DomainHostingAssistanceServicesPage() {
  return <ServicePricingDetail serviceId="domain-hosting-assistance" />;
}
