export interface WeatherData {
  temp: number;
  humidity: number;
  weather: { description: string; icon: string }[];
}