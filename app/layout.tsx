import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Footer from "@/components/nav/Footer";
import Navbar from "@/components/nav/Navbar";
import NavbarMobile from "@/components/nav/NavbarMobile";
import { ThemeProvider } from "@/components/theme-provider";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "HerbPharmsHub",
  description:
    "HerbPharmsHub - medical cannabis | inventory search, price comparison",
  icons: "/logo.png",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={cn(
            "bg-background h-full font-sans antialiased",
            fontSans.variable
          )}
        >
          <main className="relative flex flex-col min-h-screen">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <NavbarMobile />
              <div className="flex-grow flex-1">
                {children}
                <Toaster />
              </div>
              <Footer />
            </ThemeProvider>
          </main>
        </body>
      </html>
    </SessionProvider>
  );
}
