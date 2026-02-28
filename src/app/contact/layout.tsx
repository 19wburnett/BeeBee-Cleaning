import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get a Quote | Free Cleaning Quote",
  description: "Get a free, no-obligation quote from BeeBee Cleaning for residential, commercial, move-in/out, or construction cleaning services in Utah.",
  keywords: ["get cleaning quote", "free cleaning quote", "hire cleaners Utah", "BeeBee Cleaning quote"],
  openGraph: {
    title: "Get a Quote | BeeBee Cleaning",
    description: "Ready for a spotless space? Get your free cleaning quote today.",
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
