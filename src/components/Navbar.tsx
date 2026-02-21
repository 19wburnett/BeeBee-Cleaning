"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white dark:bg-[#020202] border-b border-gray-200 dark:border-gray-800 transition-colors sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-24">
          <div className="flex">
            <Link href="/" className="flex-shrink-0 flex items-center space-x-4 group">
              <div className="relative w-20 h-20 dark:hidden transition-transform group-hover:scale-105">
                <Image
                  src="/logo.svg"
                  alt="BeeBee Cleaning Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="relative w-20 h-20 hidden dark:block transition-transform group-hover:scale-105">
                <Image
                  src="/logo-dark.svg"
                  alt="BeeBee Cleaning Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-extrabold text-3xl tracking-tight text-black dark:text-white hidden sm:block uppercase font-logo mt-1 transition-colors group-hover:text-beebee-yellow dark:group-hover:text-beebee-yellow">
                BEEBEE <span className="text-beebee-yellow">CLEANING</span>
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <Link href="/" className="text-gray-900 dark:text-gray-200 hover:text-beebee-yellow dark:hover:text-beebee-yellow px-3 py-2 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/services" className="text-gray-900 dark:text-gray-200 hover:text-beebee-yellow dark:hover:text-beebee-yellow px-3 py-2 text-sm font-medium transition-colors">
              Services
            </Link>
            <Link href="/gallery" className="text-gray-900 dark:text-gray-200 hover:text-beebee-yellow dark:hover:text-beebee-yellow px-3 py-2 text-sm font-medium transition-colors">
              Gallery
            </Link>
            <Link href="/reviews" className="text-gray-900 dark:text-gray-200 hover:text-beebee-yellow dark:hover:text-beebee-yellow px-3 py-2 text-sm font-medium transition-colors">
              Reviews
            </Link>
            <Link href="/blog" className="text-gray-900 dark:text-gray-200 hover:text-beebee-yellow dark:hover:text-beebee-yellow px-3 py-2 text-sm font-medium transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="bg-beebee-yellow text-black hover:bg-yellow-500 px-4 py-2 rounded-md text-sm font-bold transition-transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md">
              Get a Quote
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#020202] overflow-hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              <Link 
                href="/" 
                className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-beebee-yellow transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/services" 
                className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-beebee-yellow transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/gallery" 
                className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-beebee-yellow transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                href="/reviews" 
                className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-beebee-yellow transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                href="/blog" 
                className="block px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-beebee-yellow transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-base font-medium text-beebee-yellow bg-black dark:bg-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
