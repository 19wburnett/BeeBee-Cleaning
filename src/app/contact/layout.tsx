import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Free Cleaning Quote",
  description: "Contact BeeBee Cleaning today for a free, no-obligation quote on residential, commercial, or construction cleaning services in Utah.",
  keywords: ["contact cleaning service", "free cleaning quote", "hire cleaners Utah", "contact BeeBee Cleaning"],
  openGraph: {
    title: "Contact BeeBee Cleaning | Get a Free Quote",
    description: "Ready for a spotless space? Contact us today for a free cleaning quote.",
    url: "https://beebeecleaningservices.com/contact",
  }
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
