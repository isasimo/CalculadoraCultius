// Home is responsible for the main functionality of the app

import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonButton, IonHeader, IonToolbar, IonTitle, IonIcon, IonLabel } from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import { CropList } from "../utils/cropData";
import Crop from "../components/Crop";
import BedDistance from "../components/BedDistance";
import CropResult from "../components/CropResult";
import SavedDataCard from "../components/SavedDataCard";
import ThemeMode from "../components/ThemeMode";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Home: React.FC = () => {
  // Initialize i18n translation
  const { t } = useTranslation();

  // Crop list initialization
  const cropList = CropList(t);

  // Change language function
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // State variables
  const [bedDistance, setBedDistance] = useState<number>(10);
  const [selectedCrop, setSelectedCrop] = useState<string>(t("tomato"));
  const initialSavedData: {
    cropId: string;
    bedDistance: number;
    result: number;
  }[] = [];
  const [savedData, setSavedData] = useState(initialSavedData);
  const [cropSpace, setCropSpace] = useState<number>(0.4);

  // Handles crop selection
  const handleCropSelected = (selectedCrop: string) => {
    setSelectedCrop(selectedCrop);
  };

  // Handles saving calculated data
  const handleSave = () => {
    const selectedCropObj = cropList.find((crop) => crop.label === selectedCrop);
    if (selectedCropObj) {
      const newData = {
        cropId: selectedCropObj.id,
        bedDistance,
        result: Math.floor(bedDistance / selectedCropObj.spacing),
      };

      setSavedData((prevData) => [...prevData, newData]);
      Preferences.set({
        key: "savedData",
        value: JSON.stringify([...savedData, newData]),
      });
    }
  };

  // Load historical data from local storage
  useEffect(() => {
    const loadSavedData = async () => {
      const storedData = await Preferences.get({ key: "savedData" });
      if (storedData.value) {
        setSavedData(JSON.parse(storedData.value));
      }
    };
    loadSavedData();
  }, []);

  // Render the main page
  return (
    <IonPage id="ion-modal-example" className="ion-text-center">
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">{t("title")}</IonTitle>
          <ThemeMode />
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-space content-max">
        {/* Bed distance modal */}
        <BedDistance setBedDistance={setBedDistance} />

        {/* Crop selection modal */}
        <Crop setCropSpace={setCropSpace} onCropSelected={handleCropSelected} selectedCrop={selectedCrop} cropList={cropList} />

        {/* Result of crop spacing calculation */}
        <CropResult cropSpace={cropSpace} bedDistance={bedDistance} />

        {/* Save button */}
        <IonButton expand="block" className="save-button" onClick={handleSave}>
          <IonLabel>{t("save")}</IonLabel>
        </IonButton>

        {/* Display saved historical data cards if available */}
        {savedData.length > 0 && (
          <div>
            {savedData.map((data, index) => (
              <SavedDataCard
                key={index}
                data={data}
                onDelete={() => {
                  const updatedSavedData = savedData.filter((item) => item !== data);
                  setSavedData(updatedSavedData);
                  Preferences.set({
                    key: "savedData",
                    value: JSON.stringify(updatedSavedData),
                  });
                }}
                savedData={savedData}
              />
            ))}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
