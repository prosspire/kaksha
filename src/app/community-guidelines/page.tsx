import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function CommunityGuidelinesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Community Guidelines
        </h1>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            At Kaksha, we're committed to creating a positive, respectful, and
            inclusive learning environment. These guidelines outline our
            expectations for all community members to ensure everyone has a
            valuable experience.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Respect and Inclusivity
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Treat all community members with respect and courtesy, regardless
              of their background, identity, or experience level.
            </li>
            <li>
              Avoid language or behavior that could be considered
              discriminatory, offensive, or exclusionary.
            </li>
            <li>
              Be mindful that communities include people from different cultural
              backgrounds and with varying perspectives.
            </li>
            <li>
              Welcome newcomers and help them feel included in discussions and
              activities.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Constructive Communication
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Focus on the ideas being discussed rather than criticizing the
              person sharing them.
            </li>
            <li>
              Provide constructive feedback that helps others learn and improve.
            </li>
            <li>Be open to receiving feedback and different perspectives.</li>
            <li>
              Use clear, concise language and avoid jargon that might exclude
              those new to the subject.
            </li>
            <li>
              Disagree respectfully and be willing to explain your reasoning.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Quality Content
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Share information that is accurate, relevant, and valuable to the
              community.
            </li>
            <li>Cite sources when sharing facts, statistics, or quotes.</li>
            <li>
              Avoid spreading misinformation or unverified claims, especially
              regarding financial advice.
            </li>
            <li>
              Create original content or properly attribute content created by
              others.
            </li>
            <li>Stay on topic in community discussions and courses.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Prohibited Behavior
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Harassment, bullying, or intimidation of any kind.</li>
            <li>Hate speech, discriminatory remarks, or personal attacks.</li>
            <li>
              Spamming, excessive self-promotion, or irrelevant advertising.
            </li>
            <li>
              Sharing explicit, violent, or otherwise inappropriate content.
            </li>
            <li>
              Violating others' privacy by sharing personal information without
              consent.
            </li>
            <li>Engaging in or promoting illegal activities.</li>
            <li>
              Creating multiple accounts to circumvent moderation or guidelines.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Financial Content Guidelines
          </h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>
              Clearly distinguish between facts, opinions, and personal
              experiences when discussing financial topics.
            </li>
            <li>
              Disclose any potential conflicts of interest when recommending
              financial products or services.
            </li>
            <li>
              Avoid making promises or guarantees about financial returns or
              outcomes.
            </li>
            <li>
              Respect that community members have different financial
              situations, goals, and risk tolerances.
            </li>
            <li>
              Encourage responsible financial decision-making and due diligence.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Enforcement
          </h2>
          <p className="text-gray-700 mb-4">
            Community administrators and moderators will enforce these
            guidelines to maintain a positive learning environment. Violations
            may result in content removal, warnings, temporary restrictions, or
            permanent removal from communities or the platform, depending on the
            severity and frequency of violations.
          </p>

          <p className="text-gray-700 mb-4">
            If you witness behavior that violates these guidelines, please
            report it to the community administrators or the Kaksha support
            team.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
            Updates to Guidelines
          </h2>
          <p className="text-gray-700 mb-4">
            These guidelines may be updated periodically to address new
            challenges or improve clarity. We will notify users of significant
            changes and maintain an archive of previous versions.
          </p>

          <p className="text-gray-700 mt-8 italic">
            Last updated: June 15, 2024
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
