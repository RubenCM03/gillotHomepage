import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = Cookies.get('cookies-accepted');
    const isOnCookiesPage = window.location.pathname === '/cookies-denied';

    // Si ya ha rechazado cookies y no está en /cookies-denied → redirigir
    if (accepted === 'false' && !isOnCookiesPage) {
      window.location.href = '/cookies-denied';
      return;
    }

    // Solo mostrar si no ha decidido aún
    if (accepted === undefined) {
      setVisible(true);
      document.body.style.overflow = 'hidden';
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookies-accepted', 'true', { expires: 365 });
    setVisible(false);
    document.body.style.overflow = '';
    if (window.location.pathname === '/cookies-denied') {
      window.location.href = '/';
    }
  };

  const rejectCookies = () => {
    Cookies.set('cookies-accepted', 'false', { expires: 365 });
    if (window.location.pathname !== '/cookies-denied') {
      window.location.href = '/cookies-denied';
    }
    setVisible(false);
    document.body.style.overflow = '';
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#193366] max-w-md w-full p-6 rounded-xl shadow-lg text-center mx-4">
        <h2 className="text-xl font-semibold mb-4">Zustimmung zu Cookies</h2>
        <p className="text-sm mb-2">
          Wir verwenden Cookies, um sicherzustellen, dass Sie die beste Erfahrung auf unserer Website machen.
        </p>
        <p className="text-sm mb-6">Lesen Sie unsere <a href="/cookies" className='text-blue-700 hover:text-blue-800 underline'>Datenschutz-Bestimmungen</a></p>
        <div className="flex justify-center gap-4">
          <button
            onClick={acceptCookies}
            className="px-4 py-2 rounded cursor-pointer bg-[#00204b] hover:bg-[#001735] text-white font-semibold transition-all duration-300"
          >
            Akzeptieren
          </button>
          <button
            onClick={rejectCookies}
            className="px-4 py-2 rounded cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold transition-all duration-300"
          >
            Ablehnen
          </button>
        </div>
      </div>
    </div>
  );
}
