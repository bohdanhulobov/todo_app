import { useState, ReactNode, useEffect } from "react";
import { Language } from "../types";
import i18n from "../i18n";
import { LanguageContext } from "../hooks/useLanguage";

export interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language");
    return (savedLanguage as Language) || "en";
  });

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    localStorage.setItem("language", currentLanguage);
  }, [currentLanguage]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
