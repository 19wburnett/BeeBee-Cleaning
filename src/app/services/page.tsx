import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HardHat, Home, Building2, Truck } from "lucide-react";
import { FadeIn, SlideUp, SlideInLeft, SlideInRight, StaggerContainer, StaggerItem, ScaleIn } from "@/components/Animations";

export const metadata = {
  title: "Services | BeeBee Cleaning",
  description: "Explore our professional cleaning services: Construction, Home, Move-In/Out, and Commercial Cleaning.",
};

export default function ServicesPage() {
  const services = [
    {
      id: "construction",
      title: "Construction Cleaning",
      description: "Post-construction cleanup requires specialized knowledge and equipment. We remove the dust, debris, and leftover materials so your newly built or renovated space is ready for move-in or presentation.",
      icon: <HardHat className="w-12 h-12 text-beebee-yellow" />,
      image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop",
      features: [
        "Dust and debris removal",
        "Window and track cleaning",
        "Floor scrubbing and polishing",
        "Final detail cleaning for turnover"
      ]
    },
    {
      id: "home",
      title: "Home Cleaning",
      description: "Keep your living space pristine with our comprehensive residential cleaning services. Whether you need a one-time deep clean or recurring maintenance, we ensure every corner of your home sparkles.",
      icon: <Home className="w-12 h-12 text-beebee-yellow" />,
      image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
      features: [
        "Kitchen and bathroom sanitization",
        "Dusting all surfaces",
        "Vacuuming and mopping floors",
        "Trash removal and tidying"
      ]
    },
    {
      id: "move",
      title: "Move In & Out Cleaning",
      description: "Moving is stressful enough without worrying about cleaning. We'll deep clean your old place to secure your deposit, or prepare your new home so you can move in with total peace of mind.",
      icon: <Truck className="w-12 h-12 text-beebee-yellow" />,
      image: "https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=2070&auto=format&fit=crop",
      features: [
        "Inside cabinet and drawer cleaning",
        "Appliance deep cleaning (fridge, oven)",
        "Baseboard and trim wiping",
        "Spot cleaning walls and doors"
      ]
    },
    {
      id: "commercial",
      title: "Commercial Cleaning",
      description: "A clean office is a productive office. We provide reliable janitorial and commercial cleaning services tailored to your business hours and specific facility requirements.",
      icon: <Building2 className="w-12 h-12 text-beebee-yellow" />,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
      features: [
        "Lobby and reception area cleaning",
        "Restroom sanitization and restocking",
        "Workstation and desk dusting",
        "Breakroom and kitchen cleaning"
      ]
    }
  ];

  return (
    <div className="bg-white dark:bg-[#020202] text-black dark:text-white min-h-screen overflow-hidden">
      {/* Header */}
      <div className="bg-black text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <SlideUp>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our Cleaning <span className="text-beebee-yellow">Services</span></h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-xl text-gray-300">
              Professional, reliable, and thorough cleaning for every type of space.
            </p>
          </SlideUp>
        </div>
      </div>

      {/* Services List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-24">
          {services.map((service, index) => {
            const isReversed = index % 2 !== 0;
            const ImageAnimation = isReversed ? SlideInRight : SlideInLeft;
            const TextAnimation = isReversed ? SlideInLeft : SlideInRight;

            return (
              <div 
                key={service.id} 
                id={service.id}
                className={`flex flex-col md:flex-row gap-12 items-center ${isReversed ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <ImageAnimation className="w-full md:w-1/2 relative h-80 md:h-[400px] rounded-lg overflow-hidden shadow-xl border border-gray-100 dark:border-gray-800 group">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </ImageAnimation>

                {/* Content */}
                <TextAnimation className="w-full md:w-1/2 space-y-6">
                  <div className="bg-black dark:bg-gray-800 p-4 inline-block rounded-md shadow-md">
                    {service.icon}
                  </div>
                  <h2 className="text-3xl font-bold">{service.title}</h2>
                  <div className="w-16 h-1 bg-beebee-yellow"></div>
                  <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-gray-700 dark:text-gray-200">
                        <div className="w-2 h-2 bg-beebee-yellow rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center text-black dark:text-white font-bold hover:text-beebee-yellow dark:hover:text-beebee-yellow transition-colors group"
                    >
                      Request this service
                      <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </TextAnimation>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-beebee-yellow py-16 text-black text-center">
        <div className="max-w-3xl mx-auto px-4">
          <SlideUp>
            <h2 className="text-3xl font-bold mb-6">Ready to experience a spotless space?</h2>
            <p className="text-lg mb-8 opacity-90">
              Contact us today for a free, no-obligation quote tailored to your specific cleaning needs.
            </p>
          </SlideUp>
          <ScaleIn delay={0.2}>
            <Link 
              href="/contact" 
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 rounded-md text-lg font-bold transition-transform hover:scale-105 active:scale-95 inline-block shadow-lg"
            >
              Get Your Free Quote
            </Link>
          </ScaleIn>
        </div>
      </div>
    </div>
  );
}
