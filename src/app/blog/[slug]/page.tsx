import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";
import { SlideUp, FadeIn } from "@/components/Animations";
import { blogPosts } from "@/data/blogs";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | BeeBee Cleaning Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  // Very simple Markdown to HTML converter for the hardcoded blog data
  const renderContent = (content: string) => {
    return content.split('\\n').map((paragraph, idx) => {
      if (paragraph.startsWith('### ')) {
        return <h3 key={idx} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
      }
      if (paragraph.trim() === '') {
        return <br key={idx} />;
      }
      // Handle bold text **text**
      let parsedHTML = paragraph;
      const boldRegex = /\\*\\*(.*?)\\*\\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(paragraph)) !== null) {
        if (match.index > lastIndex) {
          parts.push(paragraph.substring(lastIndex, match.index));
        }
        parts.push(<strong key={match.index}>{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < paragraph.length) {
        parts.push(paragraph.substring(lastIndex));
      }

      return <p key={idx} className="mb-4 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{parts.length > 0 ? parts : paragraph}</p>;
    });
  };

  return (
    <div className="bg-white dark:bg-[#020202] text-black dark:text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <SlideUp>
          <Link 
            href="/blog" 
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-beebee-yellow dark:hover:text-beebee-yellow transition-colors mb-8 group"
          >
            <ArrowLeft className="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform" />
            Back to all posts
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">{post.title}</h1>
          <div className="flex items-center text-gray-500 dark:text-gray-400 mb-10 space-x-6">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-beebee-yellow" />
              {post.date}
            </div>
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-beebee-yellow" />
              {post.author}
            </div>
          </div>
        </SlideUp>

        <FadeIn delay={0.2} className="relative h-[400px] md:h-[500px] w-full rounded-xl overflow-hidden mb-12 shadow-xl border border-gray-100 dark:border-gray-800">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </FadeIn>

        <FadeIn delay={0.4} className="prose prose-lg dark:prose-invert max-w-none">
          {renderContent(post.content)}
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.6} className="mt-16 bg-gray-50 dark:bg-[#121212] p-8 rounded-xl border border-gray-200 dark:border-gray-800 text-center">
          <h3 className="text-2xl font-bold mb-4">Want to experience a BeeBee Clean?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Let our professionals handle the dirt so you can enjoy your free time.</p>
          <Link 
            href="/contact" 
            className="bg-beebee-yellow text-black hover:bg-yellow-500 px-8 py-3 rounded-md font-bold transition-transform hover:scale-105 active:scale-95 inline-block shadow-sm"
          >
            Get a Free Quote
          </Link>
        </FadeIn>
      </div>
    </div>
  );
}
