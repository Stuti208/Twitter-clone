import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from "i18next-http-backend"
import { initReactI18next } from "react-i18next";

i18n.use(LanguageDetector).use(initReactI18next).use(Backend).init({
    debug: true,
    fallbackLng: "en",
    returnObjects:true
})