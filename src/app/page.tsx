import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import PricingCard from "@/components/pricing-card";
import Footer from "@/components/footer";
import { FeaturedCommunities } from "@/components/featured-communities";
import { createClient } from "../../supabase/server";
import {
  ArrowUpRight,
  BookOpen,
  Users,
  MessageSquare,
  IndianRupee,
  GraduationCap,
  Lightbulb,
  BarChart,
  Target,
} from "lucide-react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: plans, error } = await supabase.functions.invoke(
    "supabase-functions-get-plans",
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How Kaksha Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're revolutionizing education in India with our community-driven
              approach to learning finance, investing, and entrepreneurship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Join Communities",
                description:
                  "Connect with like-minded learners in specialized communities",
              },
              {
                icon: <BookOpen className="w-6 h-6" />,
                title: "Structured Courses",
                description:
                  "Follow expert-designed learning paths with clear milestones",
              },
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "Active Discussions",
                description:
                  "Engage in meaningful conversations with peers and mentors",
              },
              {
                icon: <GraduationCap className="w-6 h-6" />,
                title: "Track Progress",
                description:
                  "Monitor your learning journey with comprehensive tracking",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-orange-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Communities Section */}
      <FeaturedCommunities />

      {/* Community Topics Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Explore Learning Communities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover specialized communities focused on the skills that matter
              most for your growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-orange-600 mb-4">
                <IndianRupee className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Personal Finance</h3>
              <p className="text-gray-600 mb-4">
                Master budgeting, debt management, and building financial
                security for your future.
              </p>
              <a
                href="/dashboard"
                className="text-orange-600 font-medium inline-flex items-center"
              >
                Explore communities <ArrowUpRight className="ml-1 w-4 h-4" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-orange-600 mb-4">
                <BarChart className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Investing</h3>
              <p className="text-gray-600 mb-4">
                Learn stock market fundamentals, mutual funds, and building
                wealth through smart investments.
              </p>
              <a
                href="/dashboard"
                className="text-orange-600 font-medium inline-flex items-center"
              >
                Explore communities <ArrowUpRight className="ml-1 w-4 h-4" />
              </a>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-orange-600 mb-4">
                <Lightbulb className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold mb-3">Entrepreneurship</h3>
              <p className="text-gray-600 mb-4">
                Discover how to build, launch and scale successful businesses in
                the Indian market.
              </p>
              <a
                href="/dashboard"
                className="text-orange-600 font-medium inline-flex items-center"
              >
                Explore communities <ArrowUpRight className="ml-1 w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-orange-100">Expert Educators</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-orange-100">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-orange-100">Specialized Communities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Educator CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You an Educator?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Create your own branded learning community and monetize your
            expertise. Our platform provides all the tools you need.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Create Your Community
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
