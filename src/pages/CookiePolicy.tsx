import { Link } from "react-router-dom";
import { ArrowLeft, Cookie } from "lucide-react";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#2F3E2F]">
      {/* Header */}
      <section className="bg-[#355E3B] text-white">
        <div className="container mx-auto px-6 py-20 md:py-28">
          <div className="max-w-4xl mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition mb-8"
            >
              <ArrowLeft size={18} />
              Back to Home
            </Link>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37]/20">
                <Cookie className="text-[#D4AF37]" size={24} />
              </div>

              <p className="text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-medium">
                SatvAikya
              </p>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-semibold leading-tight">
              Cookie Policy
            </h1>

            <p className="mt-6 text-white/75 text-lg max-w-2xl leading-relaxed">
              This Cookie Policy explains how SatvAikya uses cookies and
              similar technologies when you visit and use our website.
            </p>

            <p className="mt-5 text-white/60 text-sm">
              Last updated: August 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container mx-auto px-6 py-14 md:py-20">
        <article className="max-w-4xl mx-auto space-y-12">

          {/* Introduction */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
              1. What Are Cookies?
            </h2>

            <p className="text-gray-600 leading-8">
              Cookies are small text files that may be stored on your device
              when you visit a website. They help websites remember
              information about your visit, maintain essential functionality,
              improve user experience, and understand how visitors interact
              with the website.
            </p>
          </section>

          {/* How we use cookies */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
              2. How We Use Cookies
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              SatvAikya may use cookies and similar technologies for purposes
              including:
            </p>

            <ul className="space-y-3 text-gray-600 leading-7 list-disc pl-6">
              <li>Keeping the website functioning correctly.</li>
              <li>Remembering your preferences and settings.</li>
              <li>Supporting login and account-related functionality.</li>
              <li>Maintaining secure sessions.</li>
              <li>Understanding website usage and improving our services.</li>
              <li>Improving the overall browsing experience.</li>
            </ul>
          </section>

          {/* Types */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">
              3. Types of Cookies We May Use
            </h2>

            <div className="space-y-5">
              <div className="rounded-2xl border border-[#355E3B]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  Essential Cookies
                </h3>

                <p className="text-gray-600 leading-7">
                  These cookies may be necessary for core website functions,
                  including security, navigation, account access, and session
                  management. The website may not function properly without
                  these cookies.
                </p>
              </div>

              <div className="rounded-2xl border border-[#355E3B]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  Preference Cookies
                </h3>

                <p className="text-gray-600 leading-7">
                  These cookies may help remember choices and preferences so
                  that your experience can be more convenient during future
                  visits.
                </p>
              </div>

              <div className="rounded-2xl border border-[#355E3B]/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  Analytics Cookies
                </h3>

                <p className="text-gray-600 leading-7">
                  If analytics services are enabled on the website, these
                  cookies may help us understand website traffic, visitor
                  behaviour, and how different parts of the website are used.
                </p>
              </div>
            </div>
          </section>

          {/* Third party */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
              4. Third-Party Cookies
            </h2>

            <p className="text-gray-600 leading-8">
              Certain third-party services integrated into the website may
              place their own cookies or similar technologies on your device.
              These services may include authentication, analytics, embedded
              content, payment services, or other functionality. The use of
              such technologies is governed by the respective third party's
              privacy and cookie policies.
            </p>
          </section>

          {/* Managing */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
              5. Managing Cookies
            </h2>

            <p className="text-gray-600 leading-8">
              You can control or delete cookies through your browser settings.
              Most browsers allow you to block cookies, delete existing
              cookies, or receive a notification before a cookie is stored.
              However, disabling certain cookies may affect the functionality
              or performance of some parts of the website.
            </p>
          </section>

          {/* Updates */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
              6. Changes to This Cookie Policy
            </h2>

            <p className="text-gray-600 leading-8">
              We may update this Cookie Policy from time to time to reflect
              changes in our website, technologies, services, or applicable
              requirements. Any updated version will be published on this
              page with a revised "Last updated" date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
              7. Contact Us
            </h2>

            <p className="text-gray-600 leading-8">
              If you have questions about this Cookie Policy or how cookies
              are used on the SatvAikya website, please contact us through our
              website.
            </p>

            <Link
              to="/contact"
              className="inline-flex mt-5 items-center justify-center rounded-full bg-[#355E3B] px-6 py-3 text-white font-medium hover:bg-[#2B4D30] transition"
            >
              Contact Us
            </Link>
          </section>

          {/* Footer navigation */}
          <div className="border-t border-gray-200 pt-8">
            <div className="flex flex-wrap gap-5 text-sm">
              <Link
                to="/"
                className="text-gray-500 hover:text-[#355E3B] transition"
              >
                Home
              </Link>

              <Link
                to="/privacy-policy"
                className="text-gray-500 hover:text-[#355E3B] transition"
              >
                Privacy Policy
              </Link>

              <Link
                to="/contact"
                className="text-gray-500 hover:text-[#355E3B] transition"
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

export default CookiePolicy;
