import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jimny PH Maintenance",
  description:
    "Check what maintenance is due for your Suzuki Jimny JB74 in the Philippines.",
  icons: {
    icon: "/jimny-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <header
          style={{
            position: "sticky",
            top: 0,
            background: "#fffef9",
            borderBottom: "3px solid #333",
            padding: "20px 24px",
            zIndex: 100,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
            }}
          >
            <img
              src="/jimny-icon.svg"
              alt="Jimny"
              style={{
                width: "48px",
                height: "48px",
              }}
            />
            <span
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                letterSpacing: "2px",
              }}
            >
              JIMNY PH MAINTENANCE
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ maxWidth: "640px", margin: "0 auto", padding: "32px 24px", flex: 1, width: "100%" }}>
          {children}
        </main>

        {/* Footer */}
        <footer
          style={{
            background: "#fffef9",
            borderTop: "1px solid #333",
            padding: "24px",
          }}
        >
          <div
            style={{
              maxWidth: "640px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <a
              href="https://www.instagram.com/club74ph/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}
            >
              <img
                src="/club-logo.jpg"
                alt="Car Club Logo"
                style={{ height: "48px", borderRadius: "50%" }}
              />
              <span style={{ color: "#444", fontSize: "14px" }}>@club74ph</span>
            </a>
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#444",
                textAlign: "right",
              }}
            >
              For Philippine Jimny JB74 owners.<br />
              Based on service manual intervals.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
