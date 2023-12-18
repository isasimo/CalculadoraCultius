import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          title: "Crop Calculator",
          save: "Save",
          close: "Close",
          distance: "meters",
          plants: "plants",
          titlebedspace: "Bed length",
          titlecrop: "Crop",
          broccoli: "Broccoli",
          carrot: "Carrot",
          corn: "Corn",
          lettuce: "Lettuce",
          potato: "Potato",
          tomato: "Tomato",
        },
      },
      es: {
        translation: {
          title: "Calculadora de cultivos",
          save: "Guardar",
          close: "Cerrar",
          distance: "metros",
          plants: "plantas",
          titlebedspace: "Longitud del bancal",
          titlecrop: "Cultivo",
          broccoli: "Brócoli",
          carrot: "Zanahoria",
          corn: "Maiz",
          lettuce: "Lechuga",
          potato: "Patata",
          tomato: "Tomate",
        },
      },
      ca: {
        translation: {
          title: "Calculadora de cultius",
          save: "Desar",
          close: "Tancar",
          distance: "metres",
          plants: "plantes",
          titlebedspace: "Longitud del bancal",
          titlecrop: "Cultiu",
          broccoli: "Bròquil",
          carrot: "Pastanaga",
          corn: "Blat de moro",
          lettuce: "Enciam",
          potato: "Patata",
          tomato: "Tomàquet",
        },
      },
      de: {
        translation: {
          title: "Ernterechner",
          save: "Speichern",
          close: "Schließen",
          distance: "Meter",
          plants: "Setzlinge",
          titlebedspace: "Beetlänge",
          titlecrop: "Ernte",
          broccoli: "Brokkoli",
          carrot: "Karotte",
          corn: "Mais",
          lettuce: "Kopfsalat",
          potato: "Kartoffel",
          tomato: "Tomate",
        },
      },
    },
    fallbackLng: "en",
    detection: {
      order: ["navigator"],
    },
    interpolation: {
      escapeValue: false,
    },
  });

console.log("Detected language:", i18n.language);

export default i18n;
