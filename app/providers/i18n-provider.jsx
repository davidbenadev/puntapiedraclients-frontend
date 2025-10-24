"use client";

import { Suspense, useEffect, useState } from "react";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export default function I18nProvider({ children, fallbackLng = "en" }) {
  const [booted, setBooted] = useState(i18n.isInitialized);

  useEffect(() => {
    if (i18n.isInitialized) return;

    i18n
      .use(HttpBackend)              // carga JSON desde /public/locales
      .use(LanguageDetector)         // detecta idioma (query, cookie, localStorage, navigator)
      .use(initReactI18next)
      .init({
        fallbackLng,
        supportedLngs: ["en", "es"],
        ns: ["common"],
        defaultNS: "common",
        load: "languageOnly",
        interpolation: { escapeValue: false },
        detection: {
          order: ["querystring", "cookie", "localStorage", "navigator"],
          caches: ["localStorage", "cookie"]
        },
        backend: {
          loadPath: "/locales/{{lng}}/{{ns}}.json"
        },
        react: {
          useSuspense: true           // los componentes con useTranslation usarán Suspense
        }
      })
      .then(() => setBooted(true))
      .catch(() => setBooted(true)); // no bloquees el render si falla
  }, [fallbackLng]);

  return (
    <I18nextProvider i18n={i18n}>
      <Suspense fallback={<div className="p-6 text-sm text-gray-500">Loading…</div>}>
        {/* Si aún no terminó init, igual mostramos el fallback del Suspense */}
        {booted ? children : <div className="p-6 text-sm text-gray-500">Loading…</div>}
      </Suspense>
    </I18nextProvider>
  );
}
