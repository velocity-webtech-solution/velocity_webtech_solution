import { createPageMetadata } from "../../lib/seo";
import ServicePricingDetail from "../services-pricing/ServicePricingDetail";

export const metadata = createPageMetadata("/website-software-maintenance-services/");

export default function WebsiteSoftwareMaintenanceServicesPage() {
  return <ServicePricingDetail serviceId="website-software-maintenance" />;
}
