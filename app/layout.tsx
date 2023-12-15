import React from "react";
import { PropsWithChildren } from "react";
import "./globals.css";

export const metadata = {
  title: "Record of Help",
  description: "This App is recording help by your children",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
