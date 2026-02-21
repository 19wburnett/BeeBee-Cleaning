import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/Animations";
import { blogPosts } from "@/data/blogs";

export const metadata = {
  title: "Cleaning Blog & Tips | BeeBee Cleaning",
  description: "Read our latest articles on cleaning tips, post-construction cleanup advice, and moving hacks from BeeBee Cleaning experts in Utah.",
  keywords: ["cleaning tips", "cleaning blog", "cleaning advice", "house cleaning guide", "BeeBee Cleaning blog"],
  openGraph: {
    title: "Cleaning Blog & Tips | BeeBee Cleaning",
    description: "Read our latest articles on cleaning tips, post-construction cleanup advice, and moving hacks.",
    url: "https://beebeecleaningservices.com/blog",
  }
};

export default function BlogPage() {
  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen text-black dark:text-white">
      {/* Header */}
      <div className="bg-black text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <SlideUp>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Cleaning <span className="text-beebee-yellow">Tips & News</span></h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-xl text-gray-300">
              Expert advice, cleaning hacks, and updates from the BeeBee Cleaning team.
            </p>
          </SlideUp>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <StaggerItem 
              key={post.id} 
              className="bg-white dark:bg-[#121212] rounded-xl shadow-md border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-beebee-yellow" />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-beebee-yellow" />
                    {post.author}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-3 group-hover:text-beebee-yellow transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="inline-flex items-center font-bold text-black dark:text-white group-hover:text-beebee-yellow transition-colors mt-auto"
                >
                  Read Article <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
