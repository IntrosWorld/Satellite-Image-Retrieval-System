import "./globals.css";

export const metadata = {
  title: "Satellite Image Retrieval System",
  description: "Cross-sensor satellite image retrieval dashboard prototype"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
