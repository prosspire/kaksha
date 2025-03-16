import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Effective Date: June 15, 2024
          </p>

          <p className="text-gray-700 mb-6">
            At Kaksha Learning Pvt. Ltd. ("Kaksha," "we," "us," or "our"), we
            value your privacy and are committed to protecting your personal
            information. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you use our platform.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Information We Collect
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Information You Provide to Us
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Account Information:</strong> When you register for an
              account, we collect your name, email address, password, and
              optionally, your profile picture and biographical information.
            </li>
            <li>
              <strong>Profile Information:</strong> Information you add to your
              profile, such as education, work experience, skills, interests,
              and social media links.
            </li>
            <li>
              <strong>Content:</strong> Information you post, share, or upload
              to our platform, including comments, discussions, course
              materials, and other content.
            </li>
            <li>
              <strong>Payment Information:</strong> If you make purchases, we
              collect payment information, billing address, and other details
              necessary to complete the transaction (though payment card
              information is processed by our payment processors).
            </li>
            <li>
              <strong>Communications:</strong> Information you provide when you
              contact us for support or communicate with other users.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">
            Information We Collect Automatically
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>Usage Information:</strong> Information about how you use
              our platform, including pages visited, time spent, links clicked,
              and features used.
            </li>
            <li>
              <strong>Device Information:</strong> Information about your
              device, including IP address, browser type, operating system, and
              device identifiers.
            </li>
            <li>
              <strong>Location Information:</strong> General location
              information based on your IP address.
            </li>
            <li>
              <strong>Cookies and Similar Technologies:</strong> We use cookies
              and similar technologies to collect information about your
              browsing behavior and preferences.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We use the information we collect for various purposes, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Providing, maintaining, and improving our platform and services
            </li>
            <li>Processing transactions and managing your account</li>
            <li>
              Personalizing your experience and delivering relevant content
            </li>
            <li>
              Communicating with you about your account, updates, and new
              features
            </li>
            <li>Responding to your inquiries and providing customer support</li>
            <li>Analyzing usage patterns to improve our platform</li>
            <li>Protecting the security and integrity of our platform</li>
            <li>Complying with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            How We Share Your Information
          </h2>
          <p className="text-gray-700 mb-4">
            We may share your information in the following circumstances:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              <strong>With Other Users:</strong> Your profile information and
              content you post publicly will be visible to other users according
              to your privacy settings.
            </li>
            <li>
              <strong>With Service Providers:</strong> We share information with
              third-party service providers who perform services on our behalf,
              such as hosting, payment processing, analytics, and customer
              support.
            </li>
            <li>
              <strong>For Legal Reasons:</strong> We may disclose information if
              required by law, regulation, or legal process, or to protect the
              rights, property, or safety of Kaksha, our users, or others.
            </li>
            <li>
              <strong>Business Transfers:</strong> If Kaksha is involved in a
              merger, acquisition, or sale of assets, your information may be
              transferred as part of that transaction.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may share information with
              third parties when you have given us your consent to do so.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Your Rights and Choices
          </h2>
          <p className="text-gray-700 mb-4">
            Depending on your location, you may have certain rights regarding
            your personal information, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Accessing, correcting, or deleting your personal information
            </li>
            <li>
              Restricting or objecting to our processing of your information
            </li>
            <li>Requesting a copy of your information in a portable format</li>
            <li>Withdrawing consent where processing is based on consent</li>
          </ul>
          <p className="text-gray-700 mt-4 mb-4">
            To exercise these rights, please contact us at privacy@kaksha.com.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Data Security
          </h2>
          <p className="text-gray-700 mb-4">
            We implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, or destruction. However, no method of
            transmission over the Internet or electronic storage is 100% secure,
            so we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            International Data Transfers
          </h2>
          <p className="text-gray-700 mb-4">
            Your information may be transferred to and processed in countries
            other than the one in which you reside. These countries may have
            different data protection laws than your country of residence. We
            will take appropriate measures to ensure that your personal
            information remains protected in accordance with this Privacy
            Policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Children's Privacy
          </h2>
          <p className="text-gray-700 mb-4">
            Our platform is not intended for children under the age of 18. We do
            not knowingly collect personal information from children under 18.
            If we become aware that we have collected personal information from
            a child under 18, we will take steps to delete that information.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or for other operational, legal, or
            regulatory reasons. We will notify you of any material changes by
            posting the updated Privacy Policy on our platform and updating the
            "Effective Date" at the top of this policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions, concerns, or requests regarding this
            Privacy Policy or our privacy practices, please contact us at:
          </p>
          <p className="text-gray-700 mb-4">
            Kaksha Learning Pvt. Ltd.
            <br />
            91 Springboard, Koramangala
            <br />
            Bangalore, Karnataka 560034
            <br />
            India
            <br />
            Email: privacy@kaksha.com
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
