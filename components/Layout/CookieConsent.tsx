import Cookies from "js-cookie";
import Link from "next/link";
import { MouseEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";

const USER_CONSENT_COOKIE_KEY = "cookie_consent_is_true";
const USER_CONSENT_COOKIE_EXPIRE_DATE =
  new Date().getTime() + 365 * 24 * 60 * 60;

const CookieConsent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(true);

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === "true";
    setCookieConsentIsTrue(consentIsTrue);
  }, []);

  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, "true", {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      });
      setCookieConsentIsTrue(true);
    }
  };

  if (cookieConsentIsTrue) {
    return null;
  }

  return (
    <section className="fixed bottom-0 left-0 w-full bg-white z-50">
      <div className="flex flex-col items-start px-5 py-3 space-y-2 border-t md:flex-row md:space-y-0 md:items-stretch md:space-x-2">
        <div className="flex items-center flex-grow text-gray-900">
          <p className="text-sm">
            This site uses services that uses cookies to deliver better
            experience and analyze traffic. You can learn more about the
            services we use at our{" "}
            <Link
              href="https://www.launch.radardao.xyz/terms-and-conditions"
              className="text-sm underline hover:text-lightAccent"
              target="_blank"
            >
              terms and conditions
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
