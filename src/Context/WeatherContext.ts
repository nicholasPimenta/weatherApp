import { createContext } from "react";

interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  tempMin: number;
  tempMax: number;
  windSpeed: number;
  humidity: number;
  description: string;
  icon: string;
  forecast: { date: string; icon: string; tempMin: number; tempMax: number }[];
}

export interface WeatherContextType {
  weather: WeatherData | null;
  fetchWeather: (city: string) => Promise<void>;
}

// Apenas a criação do contexto
export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);