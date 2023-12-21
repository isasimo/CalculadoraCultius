// CropResult component is displaying the calculated crop spacing result

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface CropResultProps {
  cropSpace: number;
  bedDistance: number;
}

const CropResult: React.FC<CropResultProps> = ({ cropSpace, bedDistance }) => {
  // Initialize i18n translation
  const { t } = useTranslation();

  // State variable for the calculated result
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    // Recalculate result whenever cropSpace or bedDistance changes
    setResult(Math.floor(bedDistance / cropSpace));
  }, [cropSpace, bedDistance]);

  // Function to create a grid of emojis
  const createEmojiGrid = (count: number): JSX.Element[] => {
    const maxEmojis = 50;
    const emojisPerRow = 10;
    const emojisToShow = Math.min(count, maxEmojis);
    const emoji = "🌱";

    // Create rows of emojis
    const rows = [];
    for (let i = 0; i < emojisToShow; i += emojisPerRow) {
      const rowEmojis = Array.from({ length: Math.min(emojisPerRow, emojisToShow - i) }, (_, index) => (
        <div key={i + index} className="result-emojis">
          {emoji}
        </div>
      ));
      rows.push(<div key={i / emojisPerRow}>{rowEmojis}</div>);
    }

    // Add "..." if maxEmojis
    if (count > maxEmojis) {
      rows.push(<div key="ellipsis">...</div>);
    }

    return rows;
  };

  // Render the result section with emojis
  return (
    <div>
      <div className="result-section">
        <p className="result-text">{result}</p>
        <p className="result-description">{t("plants")}</p>
      </div>
      <div>{createEmojiGrid(result)}</div>
    </div>
  );
};

export default CropResult;
