import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { getI18N } from "@/i18n/index.ts";

type CookieBannerProps = {
  currentLocale: "de" | "en" | "fr" | string;
};

export default function CookieBanner({ currentLocale }: CookieBannerProps) {
  const i18n = getI18N({ currentLocale });

  const [visible, setVisible] = useState(false);

  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const supportedLangs = ['de', 'en', 'fr'];
  const pathParts = path.split('/').filter(Boolean);
  const currentLang = supportedLangs.includes(pathParts[0]) ? pathParts[0] : 'de';

  const cookiesPage = currentLang === 'de' ? '/cookies' : `/${currentLang}/cookies`;
  const deniedPage = currentLang === 'de' ? '/cookies-denied' : `/${currentLang}/cookies-denied`;

  useEffect(() => {
    const accepted = Cookies.get('cookies-accepted');

    const isOnCookiesPage = path.startsWith(cookiesPage);
    const isOnDeniedPage = path.startsWith(deniedPage);

    if (isOnCookiesPage || isOnDeniedPage) {
      return;
    }

    if (typeof accepted !== 'undefined' && accepted === 'false' && !isOnDeniedPage) {
      setTimeout(() => {
        window.location.href = deniedPage;
      }, 200);
      return;
    }

    if (accepted === undefined) {
      setTimeout(() => setVisible(true), 100);
      // Aplica overflow tras el primer paint
      requestAnimationFrame(() => {
        document.body.style.overflow = 'hidden';
      });
    }
  }, [path, cookiesPage, deniedPage]);

  const acceptCookies = () => {
    Cookies.set('cookies-accepted', 'true', { expires: 365 });
    setVisible(false);
    document.body.style.overflow = '';
    if (window.location.pathname === deniedPage) {
      window.location.href = currentLang === 'de' ? '/' : `/${currentLang}`;
    }
  };

  const rejectCookies = () => {
    Cookies.set('cookies-accepted', 'false', { expires: 365 });
    if (window.location.pathname !== deniedPage) {
      window.location.href = deniedPage;
    }
    setVisible(false);
    document.body.style.overflow = '';
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white/10 max-w-md w-full p-6 rounded-xl shadow-lg text-center mx-4">
        <h2 className="text-xl font-bold mb-3">{i18n.cookieBanner.TITLE}</h2>
        <p className="text-sm mb-2">
          {i18n.cookieBanner.TEXT_1}
        </p>
        <p className="text-sm mb-4">
          {i18n.cookieBanner.TEXT_2} <a href={cookiesPage} className='text-white hover:text-[#27aee4] underline'>{i18n.cookieBanner.TEXT_3}</a>
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={acceptCookies}
            className="px-4 py-2 rounded cursor-pointer bg-[#061b29] hover:bg-black/80 text-white font-semibold transition-all duration-300"
          >
            {i18n.cookieBanner.BUTTON_1}
          </button>
          <button
            onClick={rejectCookies}
            className="px-4 py-2 rounded cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition-all duration-300"
          >
            {i18n.cookieBanner.BUTTON_2}
          </button>
        </div>
      </div>
    </div>
  );
}
