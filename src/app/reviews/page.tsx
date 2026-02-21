import { Star, Quote } from "lucide-react";
import { SlideUp, StaggerContainer, StaggerItem } from "@/components/Animations";

export const metadata = {
  title: "Customer Reviews | Trusted Cleaning Services",
  description: "Read 5-star reviews from our satisfied clients across Utah. See why BeeBee Cleaning is trusted for home, commercial, and construction cleaning.",
  keywords: ["cleaning service reviews Utah", "BeeBee Cleaning reviews", "best cleaners Salt Lake City", "top rated cleaning Provo"],
  openGraph: {
    title: "Customer Reviews | BeeBee Cleaning",
    description: "Read 5-star reviews from our satisfied clients across Utah.",
    url: "https://beebeecleaningservices.com/reviews",
  }
};

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      location: "Salt Lake City, UT",
      service: "Move Out Cleaning",
      text: "BeeBee Cleaning did an incredible job on our move-out clean. The place looked better than when we moved in! We got our full deposit back without any questions. Highly recommend their services.",
      rating: 5,
      date: "January 2026"
    },
    {
      id: 2,
      name: "James T.",
      location: "Provo, UT",
      service: "Commercial Cleaning",
      text: "Reliable, professional, and very thorough. We've been using them for our office space for months, and the difference is night and day. The team is always punctual and respectful of our workspace.",
      rating: 5,
      date: "December 2025"
    },
    {
      id: 3,
      name: "Emily R.",
      location: "Orem, UT",
      service: "Post-Construction Cleaning",
      text: "After our home renovation, the dust was everywhere. They came in and made our house spotless in just one day. I couldn't believe how they managed to get every last speck of dust out of the vents and tracks.",
      rating: 5,
      date: "November 2025"
    },
    {
      id: 4,
      name: "Michael B.",
      location: "Springville, UT",
      service: "Home Cleaning",
      text: "I hired BeeBee Cleaning for a deep clean before hosting a large family event. They exceeded my expectations. The kitchen and bathrooms were absolutely gleaming. Will definitely hire again.",
      rating: 5,
      date: "October 2025"
    },
    {
      id: 5,
      name: "Jessica L.",
      location: "Santaquin, UT",
      service: "Recurring Home Cleaning",
      text: "Having BeeBee Cleaning come every two weeks has been a lifesaver. The team is trustworthy and detail-oriented. It's the best feeling to come home to a perfectly clean house.",
      rating: 5,
      date: "September 2025"
    },
    {
      id: 6,
      name: "David C.",
      location: "Lehi, UT",
      service: "Move In Cleaning",
      text: "We bought a house that needed a lot of TLC. BeeBee Cleaning came in before we moved our furniture and scrubbed it top to bottom. It smelled so fresh and looked completely renewed.",
      rating: 5,
      date: "August 2025"
    }
  ];

  return (
    <div className="bg-gray-50 dark:bg-[#0a0a0a] min-h-screen text-black dark:text-white">
      {/* Header */}
      <div className="bg-black text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <SlideUp>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Customer <span className="text-beebee-yellow">Reviews</span></h1>
          </SlideUp>
          <SlideUp delay={0.2}>
            <p className="text-xl text-gray-300">
              Don't just take our word for it. Hear from our happy clients.
            </p>
          </SlideUp>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <StaggerItem 
              key={review.id} 
              className="bg-white dark:bg-[#121212] p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all hover:-translate-y-2 relative flex flex-col"
            >
              <Quote className="absolute top-6 right-6 h-12 w-12 text-gray-100 dark:text-gray-800" />
              <div className="flex text-beebee-yellow mb-4 relative z-10">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg italic relative z-10 flex-grow">"{review.text}"</p>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 mt-auto relative z-10">
                <p className="font-bold text-black dark:text-white">{review.name}</p>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-1">
                  <span>{review.service}</span>
                  <span>{review.location}</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
