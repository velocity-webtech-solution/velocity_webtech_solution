export const SITE_URL = "https://www.velocitywebtechsolutions.com";

const siteName = "Velocity Webtech Solutions";

export function createPageMetadata(path = "/") {
  const url = new URL(path, SITE_URL).href;

  return {
    alternates: { canonical: url },
    openGraph: {
      title: siteName,
      url,
      siteName,
      type: "website",
    },
  };
}
