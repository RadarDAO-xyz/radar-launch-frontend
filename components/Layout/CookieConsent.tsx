import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const USER_CONSENT_COOKIE_KEY = "show_cookie_consent";
const USER_CONSENT_COOKIE_EXPIRE_DATE =
  new Date().getTime() + 365 * 24 * 60 * 60;

const CookieConsent = () => {
  const [showCookieConsent, setShowCookieConsent] = useState(true);

  useEffect(() => {
    if (Cookies.get(USER_CONSENT_COOKIE_KEY) === "false") {
      setShowCookieConsent(false);
    }
  }, []);

  const onClick = () => {
    if (showCookieConsent) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, "false", {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      });
      setShowCookieConsent(false);
    }
  };

  if (!showCookieConsent) {
    return null;
  }

  return (
    <section className="fixed bottom-0 left-0 w-full bg-white z-50 px-[5%]">
      <div className="flex flex-col items-start py-3 space-y-2 border-t md:flex-row md:space-y-0 md:items-stretch md:space-x-2">
        <div className="flex items-center flex-grow text-gray-900">
          <p className="text-sm">
            This site uses services that uses cookies to deliver better
            experiences.{" "}
            <Link
              href="https://www.launch.radardao.xyz/terms-and-conditions"
              className="text-sm underline hover:text-lightAccent"
              target="_blank"
            >
              Learn more
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center">
          <Button
            className="p-3 text-sm text-white whitespace-nowrap"
            onClick={onClick}
          >
            GOT IT
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CookieConsent;
