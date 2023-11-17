import "./globals.css";

export const metadata = {
  title: "Record of Help",
  description: "This App is recording help by your children",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
