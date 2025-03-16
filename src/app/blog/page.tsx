import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { Calendar } from "lucide-react";

export default function BlogPage() {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Understanding the Basics of Stock Market Investing",
      excerpt:
        "Learn the fundamental concepts of stock market investing and how to get started with your first investment.",
      date: "June 15, 2024",
      author: "Rahul Sharma",
      category: "Investing",
      imageUrl:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    },
    {
      id: 2,
      title: "5 Essential Financial Habits for Young Professionals",
      excerpt:
        "Discover the key financial habits that every young professional in India should develop for long-term financial success.",
      date: "June 10, 2024",
      author: "Priya Patel",
      category: "Personal Finance",
      imageUrl:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=80",
    },
    {
      id: 3,
      title: "The Rise of Entrepreneurship in Tier 2 and Tier 3 Cities",
      excerpt:
        "Exploring the growing entrepreneurial ecosystem beyond India's major metropolitan areas.",
      date: "June 5, 2024",
      author: "Vikram Singh",
      category: "Entrepreneurship",
      imageUrl:
        "https://images.unsplash.com/photo-1664575599736-c5197c684172?w=800&q=80",
    },
    {
      id: 4,
      title: "Decoding Mutual Funds: A Beginner's Guide",
      excerpt:
        "Everything you need to know about mutual funds in India and how to select the right ones for your portfolio.",
      date: "May 28, 2024",
      author: "Ananya Desai",
      category: "Investing",
      imageUrl:
        "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=800&q=80",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Kaksha Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, tips, and resources on finance, investing, and
            entrepreneurship in India
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-semibold px-2 py-1 bg-orange-100 text-orange-800 rounded-full">
                    {post.category}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm ml-auto">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-orange-600">
                  <Link href={`/blog/${post.id}`}>{post.title}</Link>
                </h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    By {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.id}`}
                    className="text-orange-600 hover:text-orange-700 font-medium text-sm"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
