import React, { useEffect, useState } from 'react';

const FLAGS = [
  { code: 'en', flag: '🇬🇧', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
  { code: 'ar', flag: '🇸🇦', label: 'العربية' },
  { code: 'fr', flag: '🇫🇷', label: 'Français' },
  { code: 'pl', flag: '🇵🇱', label: 'Polski' },
  { code: 'tr', flag: '🇹🇷', label: 'Türkçe' },
];

const COUNTRY_TO_LANG: Record<string, string> = {
  'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en',
  'ES': 'es', 'MX': 'es', 'AR': 'es', 'CO': 'es',
  'SA': 'ar', 'AE': 'ar', 'EG': 'ar', 'QA': 'ar', 'KW': 'ar', 'BH': 'ar', 'OM': 'ar', 'MA': 'ar', 'DZ': 'ar', 'TN': 'ar', 'IQ': 'ar', 'JO': 'ar', 'LB': 'ar',
  'FR': 'fr', 'BE': 'fr', 'CH': 'fr', 'CI': 'fr', 'SN': 'fr',
  'PL': 'pl',
  'TR': 'tr'
};

const LanguageSelector: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<string>('tr');

  useEffect(() => {
    // Detect current language from googtrans cookie
    const match = document.cookie.match(/(?:^| )googtrans=([^;]+)/);
    if (match) {
      const parts = match[1].split('/');
      if (parts.length > 2) {
        setCurrentLang(parts[2]);
      }
    }

    // Auto-translate based on IP (only run once)
    const runAutoTranslate = async () => {
      if (!localStorage.getItem('lang_detected') && !document.cookie.includes('googtrans=')) {
        try {
          const res = await fetch('https://get.geojs.io/v1/ip/country.json');
          if (res.ok) {
            const data = await res.json();
            const countryCode = data.country;
            const langCode = COUNTRY_TO_LANG[countryCode] || 'en'; // Default to English if not TR and not in list
            
            if (langCode !== 'tr') {
              // Set googtrans cookie and reload
              setLanguage(langCode);
            }
          }
        } catch (error) {
          console.error("Auto detect language failed:", error);
        } finally {
          localStorage.setItem('lang_detected', '1');
        }
      }
    };
    
    runAutoTranslate();
  }, []);

  const setLanguage = (langCode: string, auto = false) => {
    setCurrentLang(langCode);

    if (langCode === 'tr') {
      // Clear cookies to revert to original TR
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${window.location.hostname}`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      
      // The only reliable way to completely remove Google Translate's DOM modifications 
      // and restore original React elements is to reload the page.
      window.location.reload();
      return;
    }

    // Set cookie for other languages
    document.cookie = `googtrans=/tr/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/tr/${langCode}; path=/; domain=.${window.location.hostname}`;
    document.cookie = `googtrans=/tr/${langCode}; path=/`;

    const translateCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (translateCombo) {
      translateCombo.value = langCode;
      translateCombo.dispatchEvent(new Event('change'));
      
      if (auto) {
        window.location.reload(); 
      }
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-slate-950/30 rounded-full px-4 py-2 border border-white/10 shadow-inner backdrop-blur-sm">
      {FLAGS.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`text-xl md:text-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 ${currentLang === lang.code ? 'opacity-100 ring-2 ring-blue-400 rounded-full shadow-[0_0_15px_rgba(96,165,250,0.4)] bg-white/5' : 'opacity-40 hover:opacity-100 drop-shadow-md'} mx-0.5`}
          title={lang.label}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
