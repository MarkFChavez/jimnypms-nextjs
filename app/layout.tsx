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
            <span
              style={{
                background: "#333",
                color: "#fffef9",
                fontSize: "12px",
                fontWeight: "bold",
                padding: "4px 8px",
                letterSpacing: "1px",
              }}
            >
              BETA
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ maxWidth: "960px", margin: "0 auto", padding: "32px 24px", flex: 1, width: "100%" }}>
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
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#444",
                textAlign: "center",
              }}
            >
              For Philippine Jimny JB74 owners.<br />
              Based on service manual intervals.
            </p>
            <div style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "12px",
              background: "#f8f5f2",
              padding: "16px",
              borderRadius: "8px",
            }}>
              <p style={{ margin: 0, fontSize: "14px", color: "#8b7355" }}>
                Join local groups
              </p>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
                <a
                  href="https://www.instagram.com/jb74orce"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 no-underline text-[#8b7355] hover:text-[#5c4d38] hover:underline transition-colors duration-150"
                >
                  <img
                    src="/jb74orce-logo.jpg"
                    alt="JB74orce Logo"
                    style={{ height: "40px", borderRadius: "50%" }}
                  />
                  <span style={{ fontSize: "16px" }}>JB74orce</span>
                </a>
                <a
                  href="https://www.instagram.com/club74ph"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 no-underline text-[#8b7355] hover:text-[#5c4d38] hover:underline transition-colors duration-150"
                >
                  <img
                    src="/club74-logo.jpg"
                    alt="Club 74 Logo"
                    style={{ height: "40px", borderRadius: "50%" }}
                  />
                  <span style={{ fontSize: "16px" }}>Club 74</span>
                </a>
                <a
                  href="https://www.instagram.com/jimny.mnl.community"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 no-underline text-[#8b7355] hover:text-[#5c4d38] hover:underline transition-colors duration-150"
                >
                  <img
                    src="/jimny-mnl-logo.jpg"
                    alt="Jimny MNL Logo"
                    style={{ height: "40px", borderRadius: "50%" }}
                  />
                  <span style={{ fontSize: "16px" }}>Jimny MNL</span>
                </a>
              </div>
            </div>
            <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
              v1.0
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
