export interface WeatherData {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  weather: { description: string; icon: string }[];
}

export interface WeatherDisplayProps {
  weatherData: WeatherData;
  currentCity: string;
}
