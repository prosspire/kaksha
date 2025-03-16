import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Users,
  BookOpen,
  MessageSquare,
  BarChart4,
} from "lucide-react";

export default function ForEducatorsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Share Your Knowledge, Build Your Community
                </h1>
                <p className="text-xl text-gray-700 mb-8">
                  Create and grow your own learning community on Kaksha. Connect
                  with learners passionate about finance, investing, and
                  entrepreneurship.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 text-lg">
                    <Link href="/dashboard/communities/create">
                      Create Your Community
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-600 text-orange-600 hover:bg-orange-50 px-6 py-3 text-lg"
                  >
                    <Link href="#how-it-works">Learn More</Link>
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
                  alt="Educator teaching"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-20 bg-white" id="benefits">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Why Teach on Kaksha?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Build Your Community
                </h3>
                <p className="text-gray-600">
                  Create a dedicated space for your audience to learn, discuss,
                  and grow together around your expertise.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Structured Learning
                </h3>
                <p className="text-gray-600">
                  Organize your knowledge into courses with modules, lessons,
                  and assessments for effective learning.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageSquare className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Engage Directly
                </h3>
                <p className="text-gray-600">
                  Foster meaningful discussions, answer questions, and build
                  relationships with your community members.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart4 className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Insights & Analytics
                </h3>
                <p className="text-gray-600">
                  Track engagement, monitor progress, and understand what
                  content resonates most with your audience.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Monetization Options
                </h3>
                <p className="text-gray-600">
                  Set your own pricing model for premium communities and earn
                  revenue from your expertise.
                </p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="h-8 w-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Full Control
                </h3>
                <p className="text-gray-600">
                  Maintain ownership of your content and community while
                  leveraging our platform's powerful tools.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-20 bg-gray-50" id="how-it-works">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              How It Works
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-orange-200"></div>

                {/* Step 1 */}
                <div className="relative mb-16">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        Create Your Community
                      </h3>
                      <p className="text-gray-600">
                        Set up your community with a name, description,
                        branding, and category. Define your community's focus
                        and target audience.
                      </p>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div className="md:w-1/2 md:pl-12">
                      <img
                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80"
                        alt="Create community"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative mb-16">
                  <div className="flex flex-col md:flex-row-reverse items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        Build Your Courses
                      </h3>
                      <p className="text-gray-600">
                        Create structured courses with modules, lessons, and
                        resources. Upload videos, text content, assignments, and
                        quizzes.
                      </p>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div className="md:w-1/2 md:pr-12">
                      <img
                        src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&q=80"
                        alt="Build courses"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative mb-16">
                  <div className="flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12 md:text-right">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        Engage Your Members
                      </h3>
                      <p className="text-gray-600">
                        Foster discussions, answer questions, and create events
                        to build a vibrant learning community around your
                        expertise.
                      </p>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div className="md:w-1/2 md:pl-12">
                      <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&q=80"
                        alt="Engage members"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative">
                  <div className="flex flex-col md:flex-row-reverse items-center">
                    <div className="md:w-1/2 mb-8 md:mb-0 md:pl-12">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        Grow and Scale
                      </h3>
                      <p className="text-gray-600">
                        Track analytics, gather feedback, and continuously
                        improve your content to grow your community and impact.
                      </p>
                    </div>
                    <div className="absolute left-0 md:left-1/2 transform -translate-y-1/2 md:-translate-x-1/2 w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                      4
                    </div>
                    <div className="md:w-1/2 md:pr-12">
                      <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80"
                        alt="Grow and scale"
                        className="rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
              Educator Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=rahul"
                    alt="Rahul Sharma"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Rahul Sharma
                    </h3>
                    <p className="text-gray-600">Stock Market Educator</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Kaksha has transformed how I teach investing. I've built a
                  community of over 5,000 members who are passionate about
                  learning the stock market. The platform's tools make it easy
                  to deliver structured content and engage with my audience."
                </p>
                <div className="flex items-center text-orange-500">
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=priya"
                    alt="Priya Patel"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Priya Patel
                    </h3>
                    <p className="text-gray-600">Personal Finance Coach</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "As a personal finance coach, I needed a platform that would
                  allow me to create comprehensive courses while building a
                  supportive community. Kaksha provided exactly that, and I've
                  seen my students achieve remarkable financial
                  transformations."
                </p>
                <div className="flex items-center text-orange-500">
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=vikram"
                    alt="Vikram Singh"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Vikram Singh
                    </h3>
                    <p className="text-gray-600">Startup Mentor</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "I've mentored over 50 startups through my Kaksha community.
                  The platform's discussion forums and course tools have made it
                  possible to share my entrepreneurship knowledge in a
                  structured way while building meaningful connections."
                </p>
                <div className="flex items-center text-orange-500">
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                  <span className="mr-1">★</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-orange-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Share Your Knowledge?
            </h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join Kaksha today and start building your learning community. It's
              free to get started!
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-md">
              <Link href="/dashboard/communities/create">
                Create Your Community
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
