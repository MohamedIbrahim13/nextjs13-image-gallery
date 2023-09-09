import Navbar from "./components/Navbar";
import "./globals.css";
import { Zeyada } from "next/font/google";

const zeyada = Zeyada({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "Image Gallery",
  description: "Gallery website created by Next.js v13",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={zeyada.className}>
        <Navbar />
        <main className="max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
