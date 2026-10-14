import { createPageMetadata } from "../../lib/seo";
import PageContent from "./PageContent";

export const metadata = createPageMetadata("/services-pricing/");

export default function Page() {
  return <PageContent />;
}
