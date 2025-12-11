import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Image to Text Converter - Free Online OCR Tool | ImageToText.net",
    template: "%s | ImageToText.net"
  },
  description: "Convert image to text instantly with our free online OCR tool. Extract text from JPG, PNG, WEBP images. Supports 28 languages including English, Spanish, Chinese, Arabic. Fast, accurate, and secure.",
  keywords: [
    "image to text",
    "image to text converter",
    "OCR online",
    "picture to text",
    "extract text from image",
    "convert JPG to text",
    "photo to text converter",
    "free OCR tool",
    "text recognition online",
    "scan image to text"
  ],
  authors: [{ name: "ImageToText.net" }],
  creator: "ImageToText.net",
  publisher: "ImageToText.net",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imagetotext.net",
    siteName: "ImageToText.net",
    title: "Image to Text Converter - Free Online OCR Tool",
    description: "Convert image to text instantly. Free online OCR tool supporting 28 languages. Extract text from JPG, PNG, WEBP images with high accuracy.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ImageToText.net - Free Image to Text Converter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Image to Text Converter - Free Online OCR Tool",
    description: "Convert image to text instantly. Free online OCR tool supporting 28 languages.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://imagetotext.net",
  },
  verification: {
    google: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />

        {/* Google Analytics 4 */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
