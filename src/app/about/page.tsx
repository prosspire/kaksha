import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Kaksha</h1>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Kaksha is India's premier community-driven learning platform focused
            on finance, investing, and entrepreneurship education.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-6">
            Our mission is to democratize access to high-quality education in
            finance, investing, and entrepreneurship for Indians from all walks
            of life. We believe that financial literacy and business acumen
            should not be limited to those with privileged backgrounds or
            expensive degrees.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Our Approach
          </h2>
          <p className="text-gray-700 mb-6">
            Kaksha takes a community-first approach to learning. We believe that
            the best learning happens when knowledge is shared within supportive
            communities led by experienced practitioners. Our platform enables
            experts to create and nurture learning communities where members can
            access structured courses, engage in meaningful discussions, and
            build valuable connections.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Our Team
          </h2>
          <p className="text-gray-700 mb-6">
            Kaksha was founded by a team of educators, technologists, and
            finance professionals who saw the need for a more accessible,
            community-driven approach to financial and business education in
            India. Our diverse team brings together expertise from top
            educational institutions, financial firms, and technology companies.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Join Us
          </h2>
          <p className="text-gray-700 mb-6">
            Whether you're looking to learn, teach, or both, we invite you to
            join the Kaksha community. Together, we can build a more financially
            literate and entrepreneurial India.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
