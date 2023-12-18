// colors.ts
export const colorPalette = {
  red: "#F7B5B5",
  green: "#C6EDA2",
  yellow: "#FCE183",
  purple: "#F7B5F4",
  orange: "#F5C48A",
  // Add more colors as needed
} as const;

// Define CSS variables for each color
export type ColorKey = keyof typeof colorPalette;

export const cssVariables: Record<ColorKey, string> = Object.keys(colorPalette).reduce((acc, colorName) => {
  const key = colorName as ColorKey;
  acc[key] = colorPalette[key];
  return acc;
}, {} as Record<ColorKey, string>);
