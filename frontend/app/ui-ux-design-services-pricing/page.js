import { createPageMetadata } from "../../lib/seo";
import ServicePricingDetail from "../services-pricing/ServicePricingDetail";

export const metadata = createPageMetadata("/ui-ux-design-services-pricing/");

export default function UiUxDesignServicesPricingPage() {
  return <ServicePricingDetail serviceId="ui-ux-design" />;
}
