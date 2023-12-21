import React from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { removeCircle } from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";
import { CropList } from "../utils/cropData";
import { colorPalette } from "../utils/colors";
import { useTranslation } from "react-i18next";

interface SavedDataCardProps {
  data: { cropId: string; bedDistance: number; result: number };
  onDelete: () => void;
  savedData: { cropId: string; bedDistance: number; result: number }[];
}

const SavedDataCard: React.FC<SavedDataCardProps> = ({ data, onDelete, savedData }) => {
  const { t } = useTranslation();
  const translatedCropList = CropList(t);

  const handleDelete = () => {
    // Remove the item at the specified index
    const updatedSavedData = savedData.filter((item) => item !== data);
    // Trigger the parent component's delete function
    onDelete();
    // Update local storage
    Preferences.set({ key: "savedData", value: JSON.stringify(updatedSavedData) });
  };

  const cropId = data.cropId || 0;
  const selectedCropObj = translatedCropList.find((crop) => crop.id === cropId);

  // Find the color for the current crop
  const cropColorName = selectedCropObj?.color || "white";
  const cropColor = (colorPalette as Record<string, string>)[cropColorName] || "white";

  return (
    <div className="card">
      <div className="card-emoji" style={{ backgroundColor: cropColor }}>
        {selectedCropObj?.emoji}
      </div>
      <div className="card-container">
        <div className="card-title">{t(selectedCropObj?.label || "")}</div>
        <div className="card-description">{`${data.bedDistance}m / ${selectedCropObj?.spacing}`}</div>
      </div>
      <div className="card-result">
        <span>🌱</span>
        {data.result}
      </div>
      <IonButton onClick={handleDelete} size="small" fill="clear" color={"danger"}>
        <IonIcon slot="icon-only" icon={removeCircle} />
      </IonButton>
    </div>
  );
};

export default SavedDataCard;
