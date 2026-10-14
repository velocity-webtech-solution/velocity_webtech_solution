import { createPageMetadata } from "../../lib/seo";
import ServicePricingDetail from "../services-pricing/ServicePricingDetail";

export const metadata = createPageMetadata("/crm-erp-business-management-systems-services/");

export default function CrmErpBusinessManagementSystemsServicesPage() {
  return (
    <ServicePricingDetail serviceId="crm-erp-business-management-systems" />
  );
}
