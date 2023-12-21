// ThemeMode component is toggling between dark and light mode
import React, { useState, useEffect } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import { moon, sunny } from "ionicons/icons";

const ThemeMode: React.FC = () => {
  // State variable to track the current mode (dark or light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Use effect to initialize the dark mode based on user preferences
  useEffect(() => {
    // Check if dark mode is preferred
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(prefersDark.matches);

    // Function to update the preferred mode based on changes in user preferences
    const updateMode = (mediaQuery: MediaQueryListEvent) => {
      setIsDarkMode(mediaQuery.matches);
    };

    // Add event listener for changes in user preferences
    prefersDark.addEventListener("change", updateMode);

    return () => {
      prefersDark.removeEventListener("change", updateMode);
    };
  }, []);

  // Function to toggle dark theme and update preferences
  const toggleDarkTheme = (shouldAdd: boolean) => {
    document.body.classList.toggle("dark", shouldAdd);
    Preferences.set({ key: "isDark", value: shouldAdd.toString() });
  };

  // Function to handle the toggle of dark mode
  const handleToggleMode = () => {
    // Toggle the current mode
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    // Update the dark theme
    toggleDarkTheme(newMode);
  };

  return (
    <IonButton fill="clear" color={"tertiary"} onClick={handleToggleMode} slot="end">
      <IonIcon icon={isDarkMode ? moon : sunny} />
    </IonButton>
  );
};

export default ThemeMode;
