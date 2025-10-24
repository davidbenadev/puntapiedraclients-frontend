"use client";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const languages = [
  { key: "en", label: "English", flag: "/assets/US.svg" },
  { key: "es", label: "Español", flag: "/assets/MX.svg" },
];

const navigation = [

];

export default function Navbar() {
  const { t, i18n } = useTranslation("common");

  const current =
    (i18n.resolvedLanguage || i18n.language || "en").split("-")[0];

  const switchLanguage = async (lng) => {
    await i18n.changeLanguage(lng);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lng);
    }
  };

  return (
    <header className="bg-white text-primary shadow-sm">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex flex-1">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/assets/logo2.png"
              alt="Buy Baja Logo"
              className="h-20 w-auto"
            />
          </a>
        </div>

        <div className="hidden lg:flex flex-1 justify-center gap-x-10">
          {navigation.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-sm font-semibold text-gray-700 hover:text-blue-700 transition-colors"
            >
              {t(item.key)}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {languages.map((lang) => (
            <button
              key={lang.key}
              onClick={() => switchLanguage(lang.key)}
              aria-label={`Switch to ${lang.label}`}
              className={`rounded-full p-1 transition-transform ${
                current === lang.key
                  ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={lang.flag}
                alt={lang.label}
                width={24}
                height={24}
                className="rounded-full"
              />
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}
