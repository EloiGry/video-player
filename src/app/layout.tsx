import type { Metadata } from "next";
import { Montserrat, Lato} from "next/font/google";
import "./globals.css";
import { TRPCProvider } from "@/trpc/client";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"]
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"], 
});

export const metadata: Metadata = {
  title: "Video Player",
  description: "Custom Video Player",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCProvider>
      <html lang="en">
        <body
          className={`${montserrat.variable} ${lato.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </TRPCProvider>
  );
}
