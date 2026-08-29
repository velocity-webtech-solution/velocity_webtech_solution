import "./globals.css";

const basePath = "/velocity_webtech_solution";

export const metadata = {
  title: "Velocity Webtech Solution",
  description:
    "Modern software development services for websites, apps, custom software, e-commerce, UI/UX, APIs, and cloud deployment.",
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
