export function getWeatherIcon(maxTemp: number, minTemp: number): string {
  if (minTemp < 13) return "rain";
  if (maxTemp > 22) return "sun";
  return "cloudy";
};

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
