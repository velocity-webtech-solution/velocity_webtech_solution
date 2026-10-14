import { createPageMetadata } from "../../lib/seo";
import PageContent from "./PageContent";

export const metadata = createPageMetadata("/portfolio/");

export default function Page() {
  return <PageContent />;
}
