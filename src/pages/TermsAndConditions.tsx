import { Link } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#2F3E2F]">
      {/* Header */}
      <section className="bg-[#355E3B] text-white">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="mx-auto max-w-4xl">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-white/80 transition hover:text-white"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/20">
                <FileText className="text-[#D4AF37]" size={25} />
              </div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
                SatvAikya
              </p>
            </div>

            <h1 className="font-serif text-4xl font-semibold leading-tight md:text-6xl">
              Terms & Conditions
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              Please read these terms carefully before using the SatvAikya
              website, creating an account, submitting an enquiry, or placing
              an order.
            </p>

            <p className="mt-5 text-sm text-white/60">
              Last updated: August 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-6 py-14 md:py-20">
        <article className="mx-auto max-w-4xl space-y-12">

          {/* 1 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              1. Acceptance of Terms
            </h2>

            <p className="leading-8 text-gray-600">
              By accessing or using the SatvAikya website, you agree to be
              bound by these Terms & Conditions and all applicable laws and
              regulations. If you do not agree with these terms, please do not
              use the website or its services.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              2. About SatvAikya
            </h2>

            <p className="leading-8 text-gray-600">
              SatvAikya provides handcrafted wooden decor, gifting products,
              collections, and related products and services through its
              website. Product information, availability, pricing, images, and
              descriptions may be updated from time to time.
            </p>
          </section>

          {/* 3 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              3. Website Use
            </h2>

            <p className="mb-5 leading-8 text-gray-600">
              You agree to use the website only for lawful purposes and in a
              manner that does not:
            </p>

            <ul className="list-disc space-y-3 pl-6 leading-7 text-gray-600">
              <li>
                Violate any applicable law, regulation, or legal requirement.
              </li>
              <li>
                Attempt to gain unauthorized access to accounts, systems, or
                website functionality.
              </li>
              <li>
                Interfere with the operation, security, or availability of the
                website.
              </li>
              <li>
                Submit false, misleading, fraudulent, or unauthorized
                information.
              </li>
              <li>
                Use the website to distribute malicious software or harmful
                content.
              </li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              4. Customer Accounts
            </h2>

            <p className="leading-8 text-gray-600">
              Certain features of the website may require you to create a
              customer account. You are responsible for providing accurate
              information during registration and keeping your account
              information up to date.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              You are responsible for maintaining the confidentiality of your
              account credentials and for activities carried out through your
              account. If you believe your account has been accessed
              without authorization, you should contact SatvAikya promptly.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              5. Product Information
            </h2>

            <p className="leading-8 text-gray-600">
              We make reasonable efforts to ensure that product descriptions,
              images, specifications, and other information displayed on the
              website are accurate. However, handcrafted products may have
              natural variations in appearance, colour, texture, grain, or
              finish.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Product images are provided for representation and actual
              products may vary slightly due to lighting, display settings,
              materials, and handcrafted characteristics.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              6. Prices and Availability
            </h2>

            <p className="leading-8 text-gray-600">
              Product prices and availability may change without prior notice.
              SatvAikya reserves the right to correct pricing, availability,
              product information, or other website errors when identified.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              7. Enquiries
            </h2>

            <p className="leading-8 text-gray-600">
              When you submit an enquiry through the website, you agree to
              provide information that is accurate and relevant to your
              request. SatvAikya may use the information provided to respond
              to your enquiry and communicate with you regarding the products
              or services in which you have expressed interest.
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              8. Orders Through WhatsApp
            </h2>

            <p className="leading-8 text-gray-600">
              SatvAikya may provide an option to initiate orders through
              WhatsApp. When you choose this option, your selected products
              and information provided during checkout may be transferred to
              WhatsApp for communication and order coordination.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              An order may be considered confirmed only after the relevant
              details, availability, pricing, delivery arrangements, and
              other applicable conditions have been confirmed by SatvAikya.
            </p>
          </section>

          {/* 9 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              9. Payment
            </h2>

            <p className="leading-8 text-gray-600">
              The SatvAikya website checkout currently facilitates order
              communication through WhatsApp rather than directly processing
              card or online banking payments through the website.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Any payment arrangements, payment methods, or payment
              instructions communicated during the order process are subject
              to confirmation between the customer and SatvAikya.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              10. Intellectual Property
            </h2>

            <p className="leading-8 text-gray-600">
              Unless otherwise stated, the content available on the SatvAikya
              website, including text, logos, graphics, photographs, product
              images, designs, branding, and other materials, is owned by or
              licensed to SatvAikya and may be protected by applicable
              intellectual property laws.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              You may not reproduce, distribute, modify, copy, publish, sell,
              or commercially exploit website content without prior written
              permission.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              11. User-Provided Content
            </h2>

            <p className="leading-8 text-gray-600">
              If you submit information, messages, reviews, images, or other
              content through the website, you are responsible for ensuring
              that you have the right to provide such content and that it does
              not violate applicable laws or the rights of others.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              12. Third-Party Services and Links
            </h2>

            <p className="leading-8 text-gray-600">
              The website may contain links to or integrations with
              third-party services, including WhatsApp and other external
              platforms. SatvAikya is not responsible for the privacy
              practices, content, availability, or terms of third-party
              services. Your use of those services is subject to their
              respective terms and policies.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              13. Disclaimer
            </h2>

            <p className="leading-8 text-gray-600">
              The website and its content are provided on an "as available"
              basis. While we make reasonable efforts to maintain accurate and
              reliable information, we do not guarantee that the website will
              always be uninterrupted, error-free, complete, or current.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              14. Limitation of Liability
            </h2>

            <p className="leading-8 text-gray-600">
              To the extent permitted by applicable law, SatvAikya will not be
              responsible for losses arising from unauthorized use of the
              website, temporary unavailability, third-party services, or
              information supplied by users or third parties.
            </p>
          </section>

          {/* 15 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              15. Privacy
            </h2>

            <p className="leading-8 text-gray-600">
              Your use of the website is also subject to our{" "}
              <Link
                to="/privacy-policy"
                className="font-medium text-[#355E3B] underline underline-offset-4 hover:text-[#D4AF37]"
              >
                Privacy Policy
              </Link>
              , which explains how SatvAikya collects and uses personal
              information.
            </p>

            {/* <p className="mt-4 leading-8 text-gray-600">
              Our use of cookies and similar technologies is described in our{" "}
              <Link
                to="/cookie-policy"
                className="font-medium text-[#355E3B] underline underline-offset-4 hover:text-[#D4AF37]"
              >
                Cookie Policy
              </Link>
              .
            </p> */}
          </section>

          {/* 16 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              16. Changes to These Terms
            </h2>

            <p className="leading-8 text-gray-600">
              SatvAikya may update these Terms & Conditions from time to time
              to reflect changes to our website, products, services, or legal
              requirements. Updated terms will be published on this page with
              a revised "Last updated" date.
            </p>
          </section>

          {/* 17 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              17. Contact Us
            </h2>

            <p className="leading-8 text-gray-600">
              If you have questions regarding these Terms & Conditions,
              please contact SatvAikya through our website.
            </p>

            <Link
              to="/contact"
              className="mt-5 inline-flex items-center justify-center rounded-full bg-[#355E3B] px-6 py-3 font-medium text-white transition hover:bg-[#2B4D30]"
            >
              Contact Us
            </Link>
          </section>

          {/* Navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-wrap gap-5 text-sm">
              <Link
                to="/"
                className="text-gray-500 transition hover:text-[#355E3B]"
              >
                Home
              </Link>

              <Link
                to="/privacy-policy"
                className="text-gray-500 transition hover:text-[#355E3B]"
              >
                Privacy Policy
              </Link>

              <Link
                to="/cookie-policy"
                className="text-gray-500 transition hover:text-[#355E3B]"
              >
                Cookie Policy
              </Link>

              <Link
                to="/contact"
                className="text-gray-500 transition hover:text-[#355E3B]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
};

export default TermsAndConditions;
