// Crop component is responsible for crop selection

import React, { useState, useRef, useEffect } from "react";
import { IonChip, IonModal, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonList, IonItem, IonLabel } from "@ionic/react";
import { CropData, CropList } from "../utils/cropData";
import { colorPalette } from "../utils/colors";
import { useTranslation } from "react-i18next";

interface CropProps {
  setCropSpace: React.Dispatch<React.SetStateAction<number>>;
  onCropSelected: (crop: string) => void;
  selectedCrop?: string;
  cropList: CropData[];
}

// Function to get color for a crop
const getColorForCrop = (crop: CropData): string => {
  const cropColorName = crop.color || "white";
  return (colorPalette as Record<string, string>)[cropColorName] || "white";
};

const Crop: React.FC<CropProps> = ({ setCropSpace, onCropSelected, selectedCrop }) => {
  // Initialize i18n translation
  const { t } = useTranslation();

  // Crop list initialization
  const cropList = CropList(t);

  // State variable for modal visibility
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    // Set the modal's presentingElement to the page element
    if (modal.current) {
      modal.current.presentingElement = document.getElementById("ion-modal-example") || undefined;
    }
  }, []);

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle crop chip click
  const handleChipClick = (cropLabel: string) => {
    const selectedCropObj = cropList.find((crop) => crop.label === cropLabel);
    if (selectedCropObj) {
      setCropSpace(selectedCropObj.spacing);
      onCropSelected(cropLabel);
    }
    handleCloseModal();
  };

  // Get color for the selected crop
  const getColor = selectedCrop ? getColorForCrop(cropList.find((crop) => crop.label === selectedCrop) || cropList[0]) : "white";
  const chipText = selectedCrop ? t(selectedCrop) : "";

  // Render the crop chip and selection modal
  return (
    <>
      {/* Crop chip */}
      <IonChip className="custom-chip chip-text" onClick={handleOpenModal} style={{ backgroundColor: getColor }}>
        {selectedCrop && cropList.find((crop) => crop.label === selectedCrop)?.emoji} {chipText}
      </IonChip>

      {/* Crop selection modal */}
      <IonModal isOpen={isModalOpen} ref={modal} trigger="open-modal" presentingElement={document.getElementById("ion-modal-example") || undefined} className="custom-modal" onDidDismiss={handleCloseModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{t("titlecrop")}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleCloseModal}>{t("close")}</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {cropList.map((crop) => (
              <IonItem lines="none" key={crop.label}>
                <IonChip className="chip-style chip-text" style={{ backgroundColor: getColorForCrop(crop) }} onClick={() => handleChipClick(crop.label)}>
                  {crop.emoji}
                  <IonLabel className="chip-space"> {crop.label}</IonLabel>
                </IonChip>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </IonModal>
    </>
  );
};

export default Crop;
