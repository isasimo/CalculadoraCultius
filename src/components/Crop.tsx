/** @format */

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

const getColorForCrop = (crop: CropData): string => {
  const cropColorName = crop.color || "white";
  return (colorPalette as Record<string, string>)[cropColorName] || "white";
};

const Crop: React.FC<CropProps> = ({ setCropSpace, onCropSelected, selectedCrop }) => {
  const { t } = useTranslation();
  const cropList = CropList(t);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    // Set the modal's presentingElement to the page element
    if (modal.current) {
      modal.current.presentingElement = document.getElementById("ion-modal-example") || undefined;
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChipClick = (cropLabel: string) => {
    const selectedCropObj = cropList.find((crop) => crop.label === cropLabel);
    if (selectedCropObj) {
      setCropSpace(selectedCropObj.spacing);
      onCropSelected(cropLabel);
    }
    handleCloseModal();
  };

  const getColor = selectedCrop ? getColorForCrop(cropList.find((crop) => crop.label === selectedCrop) || cropList[0]) : "white";
  const chipText = selectedCrop ? t(selectedCrop) : "";

  return (
    <>
      <IonChip className="custom-chip chip-text" onClick={handleOpenModal} style={{ backgroundColor: getColor }}>
        {selectedCrop && cropList.find((crop) => crop.label === selectedCrop)?.emoji} {chipText}
      </IonChip>

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
