import React, { useState, useRef, useEffect } from "react";
import { IonButton, IonButtons, IonChip, IonContent, IonHeader, IonInput, IonItem, IonModal, IonTitle, IonToolbar } from "@ionic/react";
import { useTranslation } from "react-i18next";

interface BedDistanceProps {
  setBedDistance: React.Dispatch<React.SetStateAction<number>>;
}

const BedDistance: React.FC<BedDistanceProps> = ({ setBedDistance }) => {
  const { t } = useTranslation();
  const [bedDistance, setBedDistanceState] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const modal = useRef<HTMLIonModalElement>(null);

  useEffect(() => {
    if (modal.current) {
      modal.current.presentingElement = document.getElementById("ion-modal-example") || undefined;
    }
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Convert the current input value to a number or default to 0 if it's not a valid number
    const newBedDistance = isNaN(parseFloat(bedDistance.toString())) ? 0 : parseFloat(bedDistance.toString());

    setBedDistance(newBedDistance);
    setIsModalOpen(false);
  };

  return (
    <>
      <IonChip className="custom-chip" onClick={handleOpenModal}>
        {bedDistance} {t("distance")}
      </IonChip>

      <IonModal isOpen={isModalOpen} ref={modal} trigger="open-modal" presentingElement={document.getElementById("ion-modal-example") || undefined} className="custom-modal" onDidDismiss={handleCloseModal}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{t("titlebedspace")}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={handleCloseModal}>{t("close")}</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-text-center center-content">
          <IonInput className="space-text" type="number" inputmode="numeric" pattern="[0-9]*" value={bedDistance.toString()} onIonChange={(e) => setBedDistanceState(parseFloat(e.detail.value!))} />
          <p className="space-description">{t("distance")}</p>
          <IonButton expand="block" onClick={handleCloseModal}>
            {t("save")}
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default BedDistance;
