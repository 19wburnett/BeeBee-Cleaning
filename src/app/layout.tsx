import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["800", "900"], // ExtraBold and Black for a strong logo presence
});

export const metadata: Metadata = {
  title: {
    default: "BeeBee Cleaning | Professional Cleaning Services in Utah",
    template: "%s | BeeBee Cleaning"
  },
  description: "BeeBee Cleaning provides high-quality residential, commercial, move-in/out, and construction cleaning services from Salt Lake City to Santaquin, UT. Get a free quote today!",
  keywords: ["cleaning services Utah", "house cleaning SLC", "commercial cleaning Utah County", "move out cleaning Salt Lake City", "construction cleanup Utah", "BeeBee Cleaning", "professional cleaners Utah"],
  authors: [{ name: "BeeBee Cleaning" }],
  creator: "BeeBee Cleaning",
  publisher: "BeeBee Cleaning",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://beebeecleaningservices.com"),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "BeeBee Cleaning | Professional Cleaning Services in Utah",
    description: "High-quality residential, commercial, move-in/out, and construction cleaning services from Salt Lake City to Santaquin, UT.",
    url: "https://beebeecleaningservices.com",
    siteName: "BeeBee Cleaning",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.svg", // Fallback to logo, ideally replace with a proper OG image later
        width: 800,
        height: 600,
        alt: "BeeBee Cleaning Logo",
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "BeeBee Cleaning | Professional Cleaning Services in Utah",
    description: "High-quality residential and commercial cleaning from Salt Lake City to Santaquin, UT.",
    creator: "@beebeecleaning",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased flex flex-col min-h-screen bg-white dark:bg-[#020202] text-black dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CleaningService",
                "name": "BeeBee Cleaning",
                "image": "https://beebeecleaningservices.com/logo.svg",
                "@id": "https://beebeecleaningservices.com",
                "url": "https://beebeecleaningservices.com",
                "telephone": "385-326-5993",
                "email": "vivian@beebeecleaningservices.com",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Salt Lake City",
                  "addressRegion": "UT",
                  "addressCountry": "US"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": 40.7608,
                  "longitude": -111.8910
                },
                "areaServed": [
                  {
                    "@type": "City",
                    "name": "Salt Lake City"
                  },
                  {
                    "@type": "City",
                    "name": "Provo"
                  },
                  {
                    "@type": "City",
                    "name": "Lehi"
                  },
                  {
                    "@type": "City",
                    "name": "Santaquin"
                  },
                  {
                    "@type": "State",
                    "name": "Utah"
                  }
                ],
                "openingHoursSpecification": [
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                    "opens": "08:00",
                    "closes": "18:00"
                  },
                  {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Saturday",
                    "opens": "09:00",
                    "closes": "14:00"
                  }
                ],
                "priceRange": "$$",
                "serviceArea": {
                  "@type": "GeoCircle",
                  "geoMidpoint": {
                    "@type": "GeoCoordinates",
                    "latitude": 40.3916,
                    "longitude": -111.8508
                  },
                  "geoRadius": "80000"
                }
              })
            }}
          />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
