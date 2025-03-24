export const convertTemperature = (temp: number, unit: string) => {
  if (unit === "C") {
    return ((temp - 32) * 5) / 9;
  }
  return temp;
};

export const formatTemperature = (temp: number, unit: any) => {
  return `${Math.round(temp)}°${unit}`;
};
