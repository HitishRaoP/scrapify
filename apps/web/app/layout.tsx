import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@scrapify/ui/src/styles/globals.css"
import { TRPCProvider } from "@scrapify/trpc-client/src/Provider"
import { StoreProvider } from "@scrapify/state"
import { ThemeProvider } from "@scrapify/ui/src/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "scrapify",
  description: "Scrape your amazon products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <TRPCProvider>
            <StoreProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark">
                {children}
              </ThemeProvider>
            </StoreProvider>
          </TRPCProvider>
        </main>
      </body>
    </html>
  );
}
