import { createPageMetadata } from "../lib/seo";
import Home from "./Home";

export const metadata = createPageMetadata("/");

export default function HomePage() {
  return <Home />;
}
