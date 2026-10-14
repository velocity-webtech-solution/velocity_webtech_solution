import { createPageMetadata } from "../../lib/seo";
import PageContent from "./PageContent";

export const metadata = createPageMetadata("/software-training-services/");

export default function Page() {
  return <PageContent />;
}
