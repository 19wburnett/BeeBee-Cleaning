"use client";

import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Search } from "lucide-react";
import { SlideUp, SlideInLeft, SlideInRight } from "@/components/Animations";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [selectedService, setSelectedService] = useState("");
  const [addressVal, setAddressVal] = useState("");
  const [addressResults, setAddressResults] = useState<any[]>([]);
  const [isSearchingAddress, setIsSearchingAddress] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search for Nominatim OpenStreetMap API
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (addressVal.length > 3 && showDropdown) {
        setIsSearchingAddress(true);
        try {
          // Using OpenStreetMap's free Nominatim API restricted to US
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              addressVal
            )}&countrycodes=us&limit=5`
          );
          const data = await response.json();
          setAddressResults(data);
        } catch (error) {
          console.error("Error fetching addresses:", error);
        } finally {
          setIsSearchingAddress(false);
        }
      } else {
        setAddressResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [addressVal, showDropdown]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      address: addressVal,
      service: formData.get("service"),
      cleaningType: formData.get("cleaningType"),
      squareFootage: formData.get("squareFootage"),
      floors: formData.get("floors"),
      bathrooms: formData.get("bathrooms"),
      kitchens: formData.get("kitchens"),
      rooms: formData.get("rooms"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        setSelectedService("");
        setAddressVal("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="bg-white dark:bg-[#020202] min-h-screen text-black dark:text-white overflow-hidden">
      {/* Header */}
      <div className="bg-black text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <SlideUp>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Contact <span className="text-beebee-yellow">Us</span></h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-xl text-gray-300">
              Get a free quote today. We're ready to make your space spotless.
            </p>
          </SlideUp>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Form */}
          <SlideInLeft>
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>
            
            {status === "success" ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 rounded-lg p-8 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p>Thank you for reaching out. We will get back to you within 24 hours with your quote.</p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="mt-6 text-green-700 dark:text-green-400 font-bold underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block font-medium">Full Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block font-medium">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      required 
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                      placeholder="385-326-5993"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block font-medium">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2 relative" ref={dropdownRef}>
                  <label htmlFor="address" className="block font-medium">Service Address *</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={addressVal}
                      onChange={(e) => {
                        setAddressVal(e.target.value);
                        setShowDropdown(true);
                      }}
                      onFocus={() => setShowDropdown(true)}
                      className="w-full px-4 py-3 pl-10 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                      placeholder="Start typing your address..."
                      autoComplete="off"
                    />
                    <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                  
                  {/* Custom OpenStreetMap Autocomplete Dropdown */}
                  {showDropdown && (addressResults.length > 0 || isSearchingAddress) && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
                      {isSearchingAddress ? (
                        <div className="px-4 py-3 text-sm text-gray-500">Searching addresses...</div>
                      ) : (
                        addressResults.map((result, idx) => (
                          <div
                            key={idx}
                            className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer text-sm border-b border-gray-100 dark:border-gray-800 last:border-0 transition-colors"
                            onClick={() => {
                              setAddressVal(result.display_name);
                              setShowDropdown(false);
                            }}
                          >
                            {result.display_name}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="service" className="block font-medium">Service Needed *</label>
                  <select 
                    id="service" 
                    name="service" 
                    required
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                  >
                    <option value="">Select a service...</option>
                    <option value="Home Cleaning">Home Cleaning</option>
                    <option value="Commercial Cleaning">Commercial Cleaning</option>
                    <option value="Move In/Out Cleaning">Move In/Out Cleaning</option>
                    <option value="Construction Cleaning">Construction Cleaning</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {selectedService === "Home Cleaning" && (
                  <div className="space-y-2">
                    <label htmlFor="cleaningType" className="block font-medium">Type of Cleaning *</label>
                    <select 
                      id="cleaningType" 
                      name="cleaningType" 
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                    >
                      <option value="">Select cleaning type...</option>
                      <option value="Regular Cleaning">Regular Cleaning</option>
                      <option value="Deep Cleaning">Deep Cleaning</option>
                    </select>
                  </div>
                )}

                {/* Pricing info - helps us give you a better quote */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Help us give you an accurate quote (optional)</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="squareFootage" className="block font-medium">Square Footage</label>
                      <input 
                        type="number" 
                        id="squareFootage" 
                        name="squareFootage" 
                        min="1"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                        placeholder="e.g. 2500"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="floors" className="block font-medium">Number of Floors</label>
                      <input 
                        type="number" 
                        id="floors" 
                        name="floors" 
                        min="1"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                        placeholder="e.g. 2"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="bathrooms" className="block font-medium">Number of Bathrooms</label>
                      <input 
                        type="number" 
                        id="bathrooms" 
                        name="bathrooms" 
                        min="0"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                        placeholder="e.g. 3"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="kitchens" className="block font-medium">Number of Kitchens</label>
                      <input 
                        type="number" 
                        id="kitchens" 
                        name="kitchens" 
                        min="0"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                        placeholder="e.g. 1"
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <label htmlFor="rooms" className="block font-medium">Number of Rooms</label>
                      <input 
                        type="number" 
                        id="rooms" 
                        name="rooms" 
                        min="0"
                        className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                        placeholder="e.g. 6"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block font-medium">Additional Details</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={5}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#121212] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-beebee-yellow focus:border-transparent transition-all"
                    placeholder="Tell us about the size of the space, specific cleaning needs, or your preferred schedule..."
                  ></textarea>
                </div>

                {status === "error" && (
                  <div className="text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 p-4 rounded-md">
                    There was an error sending your message. Please try again or call us directly.
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === "submitting"}
                  className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 disabled:bg-gray-400 dark:disabled:bg-gray-600 px-8 py-4 rounded-md text-lg font-bold transition-transform hover:scale-[1.02] active:scale-95 flex items-center justify-center shadow-lg"
                >
                  {status === "submitting" ? "Sending..." : "Submit Request"}
                  {status !== "submitting" && <Send className="ml-2 h-5 w-5" />}
                </button>
              </form>
            )}
          </SlideInLeft>

          {/* Contact Info & Map */}
          <SlideInRight className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start group">
                  <div className="bg-beebee-yellow p-3 rounded-full mr-4 transition-transform group-hover:scale-110 group-hover:rotate-12">
                    <Phone className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg">385-326-5993</p>
                  </div>
                </div>
                
                <div className="flex items-start group">
                  <div className="bg-beebee-yellow p-3 rounded-full mr-4 transition-transform group-hover:scale-110 group-hover:-rotate-12">
                    <Mail className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Email Us</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-lg break-all">vivian@beebeecleaningservices.com</p>
                  </div>
                </div>

                <div className="flex items-start group">
                  <div className="bg-beebee-yellow p-3 rounded-full mr-4 transition-transform group-hover:scale-110 group-hover:rotate-12">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Business Hours</h3>
                    <p className="text-gray-600 dark:text-gray-300">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-300">Saturday: 9:00 AM - 2:00 PM</p>
                    <p className="text-gray-600 dark:text-gray-300">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-beebee-yellow mr-2 animate-bounce" />
                <h3 className="font-bold text-2xl">Our Service Area</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We proudly serve the Wasatch Front and surrounding areas, spanning all the way from Salt Lake City down to Santaquin, UT.
              </p>
              
              {/* Map Embed centered roughly over Lehi (between SLC and Santaquin) with a zoom of 9 */}
              <div className="w-full h-80 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 shadow-md transition-shadow hover:shadow-lg">
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  loading="lazy" 
                  allowFullScreen 
                  className="dark:opacity-80 dark:invert-[90%] dark:hue-rotate-180 transition-all duration-300 hover:scale-105"
                  src="https://maps.google.com/maps?q=40.3916,-111.8508&t=&z=9&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>
          </SlideInRight>
          
        </div>
      </div>
    </div>
  );
}
