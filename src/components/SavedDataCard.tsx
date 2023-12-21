// SavedDataCard component is displaying saved historical data

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
  // Initialize i18n translation
  const { t } = useTranslation();

  // Translate crop list for display
  const translatedCropList = CropList(t);

  // Function to handle deletion of saved data
  const handleDelete = () => {
    // Remove the item at the specified index
    const updatedSavedData = savedData.filter((item) => item !== data);
    // Trigger the parent component's delete function
    onDelete();
    // Update local storage
    Preferences.set({ key: "savedData", value: JSON.stringify(updatedSavedData) });
  };

  // Retrieve cropId and find the corresponding crop object
  const cropId = data.cropId || 0;
  const selectedCropObj = translatedCropList.find((crop) => crop.id === cropId);

  // Find the color for the current crop
  const cropColorName = selectedCropObj?.color || "white";
  const cropColor = (colorPalette as Record<string, string>)[cropColorName] || "white";

  // Render the saved data card
  return (
    <div className="card">
      {/* Crop emoji with corresponding color */}
      <div className="card-emoji" style={{ backgroundColor: cropColor }}>
        {selectedCropObj?.emoji}
      </div>

      {/* Crop information container */}
      <div className="card-container">
        <div className="card-title">{t(selectedCropObj?.label || "")}</div>
        <div className="card-description">{`${data.bedDistance}m / ${selectedCropObj?.spacing}`}</div>
      </div>

      {/* Result section with emoji and number of plants */}
      <div className="card-result">
        <span>🌱</span>
        {data.result}
      </div>

      {/* Delete button */}
      <IonButton onClick={handleDelete} size="small" fill="clear" color={"danger"}>
        <IonIcon slot="icon-only" icon={removeCircle} />
      </IonButton>
    </div>
  );
};

export default SavedDataCard;
