import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";

type ConsentChoice = "accepted" | "rejected" | null;

const COOKIE_CONSENT_KEY = "satvaikya_cookie_consent";

const CookieConsent = () => {
  const [consent, setConsent] = useState<ConsentChoice>(null);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const savedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);

    if (savedConsent === "accepted" || savedConsent === "rejected") {
      setConsent(savedConsent);
    }
  }, []);

  const saveConsent = (choice: "accepted" | "rejected") => {
    localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    setConsent(choice);
    setShowSettings(false);
  };

  // Don't show the banner after the visitor has made a choice.
  if (consent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-5">
      <div className="mx-auto max-w-6xl rounded-2xl border border-[#355E3B]/15 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        {!showSettings ? (
          <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-4">
              <div className="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#355E3B]/10">
                <Cookie className="text-[#355E3B]" size={22} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-[#2F3E2F]">
                  We use cookies
                </h2>

                <p className="mt-1 max-w-3xl text-sm leading-6 text-gray-600">
                  We use essential cookies to keep SatvAikya secure and
                  functioning properly. With your consent, we may also use
                  optional cookies to improve your experience and understand
                  website usage.
                </p>

                <Link
                  to="/cookie-policy"
                  className="mt-2 inline-block text-sm font-medium text-[#355E3B] underline underline-offset-4 hover:text-[#D4AF37]"
                >
                  Read our Cookie Policy
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:shrink-0">
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="rounded-full border border-[#355E3B]/30 px-5 py-2.5 text-sm font-medium text-[#355E3B] transition hover:bg-[#355E3B]/5"
              >
                Cookie Settings
              </button>

              <button
                type="button"
                onClick={() => saveConsent("rejected")}
                className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Reject Optional
              </button>

              <button
                type="button"
                onClick={() => saveConsent("accepted")}
                className="rounded-full bg-[#355E3B] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2B4D30]"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[#2F3E2F]">
                  Cookie Settings
                </h2>

                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Manage which types of cookies you allow. Essential cookies
                  cannot be disabled because they are required for the website
                  to function properly.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowSettings(false)}
                className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                aria-label="Close cookie settings"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              {/* Essential Cookies */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-4">
                <div>
                  <h3 className="font-medium text-[#2F3E2F]">
                    Essential Cookies
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Required for security, login, sessions and core website
                    functionality.
                  </p>
                </div>

                <span className="shrink-0 text-sm font-medium text-[#355E3B]">
                  Always On
                </span>
              </div>

              {/* Optional Cookies */}
              <div className="flex items-center justify-between gap-4 rounded-xl border border-gray-200 p-4">
                <div>
                  <h3 className="font-medium text-[#2F3E2F]">
                    Optional Cookies
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Used for optional analytics, personalization and other
                    non-essential functionality.
                  </p>
                </div>

                <span className="shrink-0 text-sm font-medium text-gray-500">
                  Optional
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => saveConsent("rejected")}
                className="rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Reject Optional
              </button>

              <button
                type="button"
                onClick={() => saveConsent("accepted")}
                className="rounded-full bg-[#355E3B] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2B4D30]"
              >
                Accept All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
