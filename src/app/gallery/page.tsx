import Image from "next/image";
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/Animations";

export const metadata = {
  title: "Gallery | BeeBee Cleaning",
  description: "View our gallery of past cleaning projects from Salt Lake City to Santaquin, UT.",
};

export default function GalleryPage() {
  const images = [
    { src: "https://images.unsplash.com/photo-1527515637-ed21f6492323?q=80&w=2070&auto=format&fit=crop", alt: "Clean Living Room" },
    { src: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2070&auto=format&fit=crop", alt: "Spotless Kitchen" },
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop", alt: "Organized Bedroom" },
    { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2070&auto=format&fit=crop", alt: "Post-Construction Floor" },
    { src: "https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=2070&auto=format&fit=crop", alt: "Empty Clean House" },
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop", alt: "Commercial Office Clean" },
    { src: "https://images.unsplash.com/photo-1628611225249-6c3c7c689552?q=80&w=2070&auto=format&fit=crop", alt: "Shining Bathroom" },
    { src: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop", alt: "Dust-Free Dining Area" },
    { src: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop", alt: "Polished Kitchen Counters" },
  ];

  return (
    <div className="bg-white dark:bg-[#020202] text-black dark:text-white min-h-screen">
      {/* Header */}
      <div className="bg-black text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <SlideUp>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Our <span className="text-beebee-yellow">Gallery</span></h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-xl text-gray-300">
              See the quality of our work. Big, beautiful transformations.
            </p>
          </SlideUp>
        </div>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <StaggerItem 
              key={index} 
              className="relative h-[300px] md:h-[400px] w-full rounded-xl overflow-hidden shadow-lg group bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-end">
                <div className="p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <p className="text-beebee-yellow font-bold text-lg">{image.alt}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
