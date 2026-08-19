import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

const PrivacyPolicy = () => {
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
                <ShieldCheck className="text-[#D4AF37]" size={25} />
              </div>

              <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#D4AF37]">
                SatvAikya
              </p>
            </div>

            <h1 className="font-serif text-4xl font-semibold leading-tight md:text-6xl">
              Privacy Policy
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              This Privacy Policy explains how SatvAikya collects, uses,
              stores, and protects information when you use our website and
              services.
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
              1. Introduction
            </h2>

            <p className="leading-8 text-gray-600">
              SatvAikya respects your privacy and is committed to protecting
              the personal information you provide when using our website.
              This Privacy Policy describes the types of information we may
              collect, why we collect it, how it may be used, and the choices
              available to you.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              By using the SatvAikya website, you acknowledge the practices
              described in this Privacy Policy.
            </p>
          </section>

          {/* 2 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              2. Information We Collect
            </h2>

            <p className="mb-5 leading-8 text-gray-600">
              Depending on how you use our website, we may collect the
              following categories of information.
            </p>

            <div className="space-y-5">
              <div className="rounded-2xl border border-[#355E3B]/10 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">
                  Account Information
                </h3>

                <p className="leading-7 text-gray-600">
                  When you register for an account, we may collect your first
                  name, last name, phone number, email address, and account
                  authentication information.
                </p>
              </div>

              <div className="rounded-2xl border border-[#355E3B]/10 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">
                  Enquiry Information
                </h3>

                <p className="leading-7 text-gray-600">
                  When you submit an enquiry, we may collect your name, phone
                  number, email address, city, product or collection of
                  interest, requested quantity, and the message or other
                  information you provide.
                </p>
              </div>

              <div className="rounded-2xl border border-[#355E3B]/10 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">
                  Order and Checkout Information
                </h3>

                <p className="leading-7 text-gray-600">
                  When you initiate an order through our website, we may
                  collect information such as your name, phone number, email
                  address, delivery address, city, state, pincode, order
                  notes, products selected, quantities, and order total.
                </p>
              </div>

              <div className="rounded-2xl border border-[#355E3B]/10 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">
                  Technical and Usage Information
                </h3>

                <p className="leading-7 text-gray-600">
                  We may receive limited technical information necessary for
                  website operation, security, authentication, session
                  management, and improving the website experience.
                </p>
              </div>
            </div>
          </section>

          {/* 3 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              3. How We Use Your Information
            </h2>

            <p className="mb-5 leading-8 text-gray-600">
              We may use the information we collect for purposes including:
            </p>

            <ul className="list-disc space-y-3 pl-6 leading-7 text-gray-600">
              <li>Creating and managing customer accounts.</li>
              <li>Authenticating users and maintaining secure sessions.</li>
              <li>Responding to enquiries and customer requests.</li>
              <li>Understanding which products customers are interested in.</li>
              <li>Processing and coordinating customer orders.</li>
              <li>Communicating with customers about enquiries or orders.</li>
              <li>Maintaining and improving website functionality.</li>
              <li>Protecting the website against misuse and security threats.</li>
              <li>Complying with applicable legal obligations.</li>
            </ul>
          </section>

          {/* 4 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              4. Account and Authentication
            </h2>

            <p className="leading-8 text-gray-600">
              If you create an account on SatvAikya, your account information
              is used to provide authenticated access to features such as your
              profile, enquiries, wishlist, and other customer functionality.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Authentication and account session functionality is provided
              through our backend services. We do not use your password for
              marketing purposes.
            </p>
          </section>

          {/* 5 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              5. Enquiries
            </h2>

            <p className="leading-8 text-gray-600">
              Information submitted through enquiry forms may be stored and
              used to respond to your request, understand your requirements,
              communicate with you, and provide information about relevant
              products or services.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Enquiry information may be associated with your customer
              account when you are logged in.
            </p>
          </section>

          {/* 6 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              6. Orders and WhatsApp Communication
            </h2>

            <p className="leading-8 text-gray-600">
              SatvAikya may use WhatsApp to facilitate communication regarding
              orders and customer requests. When you choose to proceed with
              an order through WhatsApp, information relevant to the order,
              such as your contact details, delivery information, selected
              products, quantities, and order details, may be shared through
              WhatsApp for communication and order coordination.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              SatvAikya does not collect or store your credit card, debit card,
              or online banking credentials through the checkout form described
              above.
            </p>
          </section>

          {/* 7 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              7. Cookies and Similar Technologies
            </h2>

            <p className="leading-8 text-gray-600">
              SatvAikya may use essential cookies and similar technologies to
              support website functionality, authentication, security, and
              session management. Optional technologies may also be used where
              enabled and where appropriate consent has been provided.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              For more information about how cookies are used, please see our{" "}
              <Link
                to="/cookie-policy"
                className="font-medium text-[#355E3B] underline underline-offset-4 hover:text-[#D4AF37]"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          {/* 8 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              8. Third-Party Services
            </h2>

            <p className="mb-5 leading-8 text-gray-600">
              We may use third-party services to operate and support parts of
              the website. These services may process information on our
              behalf or as part of providing their own services.
            </p>

            <div className="space-y-5">
              <div className="rounded-2xl border border-[#355E3B]/10 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">
                  Supabase
                </h3>

                <p className="leading-7 text-gray-600">
                  SatvAikya uses Supabase services for backend functionality,
                  including authentication and data storage. Information
                  submitted through customer account and enquiry features may
                  therefore be processed through Supabase infrastructure.
                </p>
              </div>

              <div className="rounded-2xl border border-[#355E3B]/10 bg-white p-6 shadow-sm">
                <h3 className="mb-2 text-lg font-semibold">
                  WhatsApp
                </h3>

                <p className="leading-7 text-gray-600">
                  WhatsApp may be used to communicate with customers and
                  coordinate orders when a customer chooses to use the
                  WhatsApp ordering option. WhatsApp's own privacy policies
                  and terms apply to information processed through its
                  services.
                </p>
              </div>
            </div>
          </section>

          {/* 9 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              9. Data Security
            </h2>

            <p className="leading-8 text-gray-600">
              We take reasonable measures to protect personal information
              against unauthorized access, misuse, alteration, disclosure, or
              destruction. However, no method of transmitting or storing
              information electronically can be guaranteed to be completely
              secure.
            </p>
          </section>

          {/* 10 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              10. Data Retention
            </h2>

            <p className="leading-8 text-gray-600">
              We retain personal information for as long as reasonably
              necessary to provide our services, maintain customer accounts,
              respond to enquiries, coordinate orders, meet legitimate
              business requirements, and comply with applicable legal
              obligations.
            </p>

            <p className="mt-4 leading-8 text-gray-600">
              Retention periods may vary depending on the type of information
              and the purpose for which it was collected.
            </p>
          </section>

          {/* 11 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              11. Your Choices and Rights
            </h2>

            <p className="mb-5 leading-8 text-gray-600">
              Depending on applicable law, you may have rights regarding your
              personal information, including the ability to:
            </p>

            <ul className="list-disc space-y-3 pl-6 leading-7 text-gray-600">
              <li>Request access to personal information we hold about you.</li>
              <li>Request correction of inaccurate information.</li>
              <li>Request deletion of information where legally applicable.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Ask questions about how your information is processed.</li>
            </ul>

            <p className="mt-5 leading-8 text-gray-600">
              Requests can be made using the contact information available on
              our website.
            </p>
          </section>

          {/* 12 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              12. Children's Privacy
            </h2>

            <p className="leading-8 text-gray-600">
              Our website is not intentionally designed to collect personal
              information from children without appropriate authorization. If
              you believe that a child has provided personal information to us
              improperly, please contact us so that we can review and take
              appropriate action.
            </p>
          </section>

          {/* 13 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              13. Changes to This Privacy Policy
            </h2>

            <p className="leading-8 text-gray-600">
              We may update this Privacy Policy from time to time to reflect
              changes in our services, technology, legal requirements, or
              business practices. Any updated version will be published on
              this page with a revised "Last updated" date.
            </p>
          </section>

          {/* 14 */}
          <section>
            <h2 className="mb-4 font-serif text-2xl font-semibold md:text-3xl">
              14. Contact Us
            </h2>

            <p className="leading-8 text-gray-600">
              If you have questions, concerns, or requests regarding this
              Privacy Policy or the way SatvAikya handles personal
              information, please contact us through our website.
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

              {/* <Link
                to="/cookie-policy"
                className="text-gray-500 transition hover:text-[#355E3B]"
              >
                Cookie Policy
              </Link> */}

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

export default PrivacyPolicy;
