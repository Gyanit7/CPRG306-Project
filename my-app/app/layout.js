import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-Zone | Electronics Store",
  description: "Buy the latest electronics with ease at E-Zone",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 text-gray-900 flex flex-col min-h-screen`}
      >
        {/* ✅ Use the client-only Providers wrapper here */}
        <Providers>
          <Navbar />
          <main className="flex-grow p-6">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
