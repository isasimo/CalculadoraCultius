import React, { useState, useEffect } from "react";
import { IonContent, IonPage, IonButton, IonHeader, IonToolbar, IonTitle, IonIcon, IonLabel } from "@ionic/react";
import { Preferences } from "@capacitor/preferences";
import Crop from "../components/Crop";
import BedDistance from "../components/BedDistance";
import CropResult from "../components/CropResult";
import SavedDataCard from "../components/SavedDataCard";
import { CropList } from "../utils/cropData";
import ThemeMode from "../components/ThemeMode";

import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const cropList = CropList(t);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const [cropSpace, setCropSpace] = useState<number>(0.4);
  const [bedDistance, setBedDistance] = useState<number>(10);
  const initialCropLabel = "tomato";
  const initialCropTranslation = t(initialCropLabel);
  const [selectedCrop, setSelectedCrop] = useState<string>(initialCropTranslation);
  const initialSavedData: { cropId: string; bedDistance: number; result: number }[] = [];
  const [savedData, setSavedData] = useState(initialSavedData);

  const handleCropSelected = (selectedCrop: string) => {
    setSelectedCrop(selectedCrop);
  };

  const handleSave = () => {
    const selectedCropObj = cropList.find((crop) => crop.label === selectedCrop);
    if (selectedCropObj) {
      const newData = {
        cropId: selectedCropObj.id,
        bedDistance,
        result: Math.floor(bedDistance / selectedCropObj.spacing),
      };

      setSavedData((prevData) => [...prevData, newData]);
      Preferences.set({ key: "savedData", value: JSON.stringify([...savedData, newData]) });
    }
  };

  // Load historical data from local storage on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      const storedData = await Preferences.get({ key: "savedData" });
      if (storedData.value) {
        setSavedData(JSON.parse(storedData.value));
      }
    };
    loadSavedData();
  }, []);

  return (
    <IonPage id="ion-modal-example" className="ion-text-center">
      <IonHeader>
        <IonToolbar>
          <IonTitle slot="start">{t("title")}</IonTitle>
          <ThemeMode />
        </IonToolbar>
      </IonHeader>
      <IonContent className="content-space content-max">
        {/* Language Selector */}
        {/*         <select onChange={(e) => changeLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
        </select> */}

        <BedDistance setBedDistance={setBedDistance} />
        <Crop setCropSpace={setCropSpace} onCropSelected={handleCropSelected} selectedCrop={selectedCrop} cropList={cropList} />
        <CropResult cropSpace={cropSpace} bedDistance={bedDistance} />
        <IonButton expand="block" className="save-button" onClick={handleSave}>
          <IonLabel class="ion-padding-horizontal">{t("save")}</IonLabel>
        </IonButton>
        {savedData.length > 0 && (
          <div>
            {savedData.map((data, index) => (
              <SavedDataCard
                key={index}
                data={data}
                onDelete={() => {
                  const updatedSavedData = savedData.filter((item) => item !== data);
                  setSavedData(updatedSavedData);
                  Preferences.set({ key: "savedData", value: JSON.stringify(updatedSavedData) });
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
