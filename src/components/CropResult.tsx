import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface CropResultProps {
  cropSpace: number;
  bedDistance: number;
}

const CropResult: React.FC<CropResultProps> = ({ cropSpace, bedDistance }) => {
  const { t } = useTranslation();
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    // Recalculate result whenever cropSpace or bedDistance changes
    setResult(Math.floor(bedDistance / cropSpace));
  }, [cropSpace, bedDistance]);

  // Function to create a grid of emojis with a maximum of 10 emojis per line
  const createEmojiGrid = (count: number): JSX.Element[] => {
    const maxEmojis = 50;
    const emojisToShow = Math.min(count, maxEmojis);
    const emojisPerRow = 10;
    const emoji = "🌱";

    // Create rows of emojis
    const rows = [];
    for (let i = 0; i < emojisToShow; i += emojisPerRow) {
      const rowEmojis = Array.from({ length: Math.min(emojisPerRow, emojisToShow - i) }, (_, index) => (
        <div key={i + index} style={{ display: "inline-block", margin: "2px", textAlign: "center" }}>
          {emoji}
        </div>
      ));
      rows.push(
        <div key={i / emojisPerRow} style={{ marginBottom: "5px" }}>
          {rowEmojis}
        </div>
      );
    }

    // Add an ellipsis if there are more than 50 plants
    if (count > maxEmojis) {
      rows.push(
        <div key="ellipsis" style={{ display: "inline-block", margin: "2px", textAlign: "center" }}>
          ...
        </div>
      );
    }

    return rows;
  };

  return (
    <div>
      <div className="result-section">
        <p className="result-text">{result}</p>
        <p className="result-description">{t("plants")}</p>
      </div>
      <div style={{ marginTop: "10px" }}>{createEmojiGrid(result)}</div>
    </div>
  );
};

export default CropResult;
