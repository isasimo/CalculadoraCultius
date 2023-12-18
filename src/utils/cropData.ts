export interface CropData {
  id: string;
  label: string;
  spacing: number;
  emoji: string;
  color: string;
}

export const CropList = (t: (key: string) => string): CropData[] => {
  return [
    { id: "broccoli", label: t('broccoli'), spacing: 0.40, emoji: '🥦', color: 'green' },
    { id: "carrot", label: t('carrot'), spacing: 0.30, emoji: '🥕', color: 'orange' },
    { id: "corn", label: t('corn'), spacing: 0.30, emoji: '🌽', color: 'yellow' },
    { id: "lettuce", label: t('lettuce'), spacing: 0.20, emoji: '🥬', color: 'green' },
    { id: "potato", label: t('potato'), spacing: 0.25, emoji: '🥔', color: 'yellow' },
    { id: "tomato",  label: t('tomato'), spacing: 0.4, emoji: '🍅', color: 'red' },
  ];
};
