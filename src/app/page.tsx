import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, CheckCircle2, ShieldCheck, Calendar, ThumbsUp, Gem } from "lucide-react";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem, ScaleIn } from "@/components/Animations";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop"
            alt="Professional Cleaning Service"
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <SlideUp>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Spotless Spaces, <span className="text-beebee-yellow">Guaranteed.</span>
            </h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Professional residential and commercial cleaning services from Salt Lake City to Santaquin. We handle the mess so you don't have to.
            </p>
          </SlideUp>
          <SlideUp delay={0.4}>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/contact" 
                className="bg-beebee-yellow text-black hover:bg-yellow-500 px-8 py-4 rounded-md text-lg font-bold transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link 
                href="/services" 
                className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-md text-lg font-bold transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                Our Services
              </Link>
            </div>
          </SlideUp>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-white dark:bg-[#020202] text-black dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose BeeBee Cleaning?</h2>
            <div className="w-24 h-1 bg-beebee-yellow mx-auto"></div>
          </SlideUp>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <StaggerItem className="text-center space-y-4">
              <div className="bg-black dark:bg-gray-800 text-beebee-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110">
                <Gem className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Premium Quality, Great Price</h3>
              <p className="text-gray-600 dark:text-gray-300">We deliver incredibly thorough deep cleans without the premium price tag. Experience luxury cleaning that fits your budget.</p>
            </StaggerItem>
            <StaggerItem className="text-center space-y-4">
              <div className="bg-black dark:bg-gray-800 text-beebee-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Trusted Professionals</h3>
              <p className="text-gray-600 dark:text-gray-300">Our team is fully trained, vetted, and dedicated to delivering the highest standard of cleanliness.</p>
            </StaggerItem>
            <StaggerItem className="text-center space-y-4">
              <div className="bg-black dark:bg-gray-800 text-beebee-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110">
                <Calendar className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Flexible Scheduling</h3>
              <p className="text-gray-600 dark:text-gray-300">Whether you need a one-time deep clean or regular maintenance, we work around your schedule.</p>
            </StaggerItem>
            <StaggerItem className="text-center space-y-4">
              <div className="bg-black dark:bg-gray-800 text-beebee-yellow w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 transition-transform hover:scale-110">
                <ThumbsUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold">Satisfaction Guarantee</h3>
              <p className="text-gray-600 dark:text-gray-300">If you're not completely satisfied with our service, let us know and we'll make it right.</p>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 text-black dark:text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Our Recent Work</h2>
              <div className="w-16 h-1 bg-beebee-yellow"></div>
            </div>
            <Link href="/gallery" className="text-black dark:text-white font-semibold hover:text-beebee-yellow dark:hover:text-beebee-yellow transition-colors flex items-center group">
              View All <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </SlideUp>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1527515637-ed21f6492323?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
            ].map((img, i) => (
              <StaggerItem key={i} className="relative h-64 md:h-80 w-full group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
                <Image
                  src={img}
                  alt={`Cleaning Gallery Image ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Reviews Preview */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <div className="w-24 h-1 bg-beebee-yellow mx-auto"></div>
          </SlideUp>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah M.", text: "BeeBee Cleaning did an incredible job on our move-out clean. The place looked better than when we moved in!" },
              { name: "James T.", text: "Reliable, professional, and very thorough. We've been using them for our office space for months." },
              { name: "Emily R.", text: "After our home renovation, the dust was everywhere. They came in and made our house spotless in just one day." }
            ].map((review, i) => (
              <StaggerItem key={i} className="bg-gray-900 p-8 rounded-lg border border-gray-800 relative hover:-translate-y-2 transition-transform duration-300">
                <div className="flex text-beebee-yellow mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                </div>
                <p className="text-gray-300 mb-6 text-lg italic">"{review.text}"</p>
                <p className="font-bold text-white">— {review.name}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <FadeIn delay={0.4} className="mt-12 text-center">
            <Link href="/reviews" className="inline-flex items-center text-white font-semibold hover:text-beebee-yellow transition-colors group">
              Read More Reviews <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
