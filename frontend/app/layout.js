import { SITE_URL } from "../lib/seo";

import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Velocity Webtech Solutions | Website & Software Development",
  description:
    "Professional website development, mobile app development, e-commerce, custom software, and digital marketing services in Kolkata.",
  openGraph: {
    title: "Velocity Webtech Solutions",
    url: `${SITE_URL}/`,
    siteName: "Velocity Webtech Solutions",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: `${basePath}/favicon.ico`, type: "image/x-icon" }],
    shortcut: [{ url: `${basePath}/favicon.ico`, type: "image/x-icon" }],
    apple: `${basePath}/image/logo.png`,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
