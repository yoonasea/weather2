// Helper function to capitalize each word in a string
export const capitalizeWords = (description: string) => {
  return description.replace(/\b\w/g, (char) => char.toUpperCase());
};

// Helper function to format temperature
export const formatTemperature = (temp: number, tempMax?: number): string => {
  if (tempMax !== undefined) {
    return `${Math.round(temp)}° / ${Math.round(tempMax)}°`;
  } else {
    return `${Math.round(temp)}°`;
  }
};
