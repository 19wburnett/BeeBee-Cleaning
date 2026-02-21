"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { SlideUp, StaggerContainer, StaggerItem, FadeIn } from "@/components/Animations";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Info */}
          <StaggerItem className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 bg-transparent p-1 w-fit group">
              <div className="relative w-16 h-16 transition-transform group-hover:scale-105">
                <Image
                  src="/logo-dark.svg"
                  alt="BeeBee Cleaning Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white pr-2 uppercase font-logo mt-1 transition-colors group-hover:text-beebee-yellow">
                BEEBEE <span className="text-beebee-yellow">CLEANING</span>
              </span>
            </Link>
            <p className="text-gray-400 mt-4 max-w-sm">
              Professional cleaning services from Salt Lake City to Santaquin, UT. We handle construction, home, commercial, and move-in/out cleaning.
            </p>
          </StaggerItem>

          {/* Quick Links */}
          <StaggerItem>
            <h3 className="text-lg font-bold text-beebee-yellow mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-beebee-yellow transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-400 hover:text-beebee-yellow transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-400 hover:text-beebee-yellow transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-gray-400 hover:text-beebee-yellow transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-beebee-yellow transition-colors inline-block hover:translate-x-1 transform duration-200">
                  Contact Us
                </Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Contact Info */}
          <StaggerItem>
            <h3 className="text-lg font-bold text-beebee-yellow mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 group">
                <MapPin className="h-5 w-5 text-beebee-yellow shrink-0 mt-0.5 transition-transform group-hover:scale-110 group-hover:-translate-y-1" />
                <span className="transition-colors group-hover:text-white">Serving Salt Lake City to Santaquin, UT</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 group">
                <Phone className="h-5 w-5 text-beebee-yellow shrink-0 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                <span className="transition-colors group-hover:text-white">385-326-5993</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 group">
                <Mail className="h-5 w-5 text-beebee-yellow shrink-0 transition-transform group-hover:scale-110 group-hover:-rotate-12" />
                <span className="transition-colors group-hover:text-white">vivian@beebeecleaningservices.com</span>
              </li>
            </ul>
          </StaggerItem>
        </StaggerContainer>

        <FadeIn delay={0.4} className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} BeeBee Cleaning. All rights reserved.</p>
        </FadeIn>
      </div>
    </footer>
  );
}
