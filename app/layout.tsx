import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jimny Maintenance Check",
  description:
    "Check what maintenance is due for your Suzuki Jimny Gen 4 (JB64/JB74).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
