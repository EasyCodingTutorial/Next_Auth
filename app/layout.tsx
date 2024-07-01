import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// For Uploadthing
import "@uploadthing/react/styles.css";

// Next Auth
import { Provider } from "./Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Easy Coding Tutorial",
    default: "Authentication"
  },
  description: "Easy Coding Tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
  );
}
