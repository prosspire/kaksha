import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";

export default function HelpCenterPage() {
  // Sample FAQ data
  const faqs = [
    {
      category: "Account & Profile",
      questions: [
        {
          id: "account-1",
          question: "How do I create an account on Kaksha?",
          answer:
            "To create an account, click on the 'Sign Up' button in the top right corner of the homepage. You can sign up using your email address and password or through your Google account.",
        },
        {
          id: "account-2",
          question: "How do I reset my password?",
          answer:
            "If you've forgotten your password, click on 'Sign In', then select 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password.",
        },
        {
          id: "account-3",
          question: "How can I update my profile information?",
          answer:
            "After signing in, go to your Dashboard and click on 'Settings' in the sidebar. Here, you can update your profile information, including your name, profile picture, bio, and contact details.",
        },
      ],
    },
    {
      category: "Communities & Courses",
      questions: [
        {
          id: "community-1",
          question: "How do I join a community?",
          answer:
            "You can browse available communities from the 'Communities' section. Once you find a community you're interested in, click on it to view details and then click the 'Subscribe' button to join after completing the payment process.",
        },
        {
          id: "community-2",
          question: "How do I join a paid community?",
          answer:
            "Each community has its own subscription fee. To join a paid community, click the 'Subscribe' button on the community page, which will take you to the payment page where you can complete your subscription.",
        },
        {
          id: "community-3",
          question: "How do I access course content within a community?",
          answer:
            "After joining a community, navigate to the community page and select the 'Courses' tab. Here, you'll find all available courses. Click on a course to start learning.",
        },
      ],
    },
    {
      category: "For Educators",
      questions: [
        {
          id: "educator-1",
          question: "How do I create a community as an educator?",
          answer:
            "To create a community, sign in to your account, go to your Dashboard, and select 'Communities' from the sidebar. Click on 'Create Community' and follow the steps to set up your community.",
        },
        {
          id: "educator-2",
          question: "How do I create courses for my community?",
          answer:
            "After creating a community, navigate to your community page and select the 'Courses' tab. Click on 'Create Course' and follow the guided process to build your course content.",
        },
        {
          id: "educator-3",
          question: "How can I manage members in my community?",
          answer:
            "As a community admin, you can manage members by going to your community page, selecting the 'Settings' tab, and then clicking on 'Members'. Here, you can view all members and manage their roles.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Help Center
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Find answers to common questions about using Kaksha
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Input
                placeholder="Search for answers..."
                className="pl-10 py-6 text-lg rounded-lg shadow-md"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto space-y-8">
              {faqs.map((category) => (
                <div
                  key={category.category}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {category.category}
                  </h3>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions.map((faq) => (
                      <AccordionItem
                        key={faq.id}
                        value={faq.id}
                        className="border border-gray-200 rounded-md overflow-hidden"
                      >
                        <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 text-left font-medium text-gray-800">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 py-3 bg-gray-50 text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              If you couldn't find the answer you were looking for, our support
              team is here to help.
            </p>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2">
              Contact Support
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
