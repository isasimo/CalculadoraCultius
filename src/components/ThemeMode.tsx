import React, { useState, useEffect } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import { moon, sunny } from "ionicons/icons";

const ThemeMode: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(prefersDark.matches);

    const updateDarkMode = (mediaQuery: MediaQueryListEvent) => {
      setIsDarkMode(mediaQuery.matches);
    };

    prefersDark.addEventListener("change", updateDarkMode);

    return () => {
      prefersDark.removeEventListener("change", updateDarkMode);
    };
  }, []);

  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle("dark", shouldAdd);
    Preferences.set({ key: "isDark", value: shouldAdd.toString() });
  };

  const handleToggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    toggleDarkTheme(newMode);
  };

  return (
    <IonButton fill="clear" color={"tertiary"} onClick={handleToggleDarkMode} slot="end">
      <IonIcon icon={isDarkMode ? moon : sunny} />
    </IonButton>
  );
};

export default ThemeMode;
