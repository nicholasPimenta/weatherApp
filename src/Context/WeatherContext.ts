import { createContext } from "react";

interface WeatherData {
  city: string;
  icon: string;
  country: string;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;
  temperature: number;
  description: string;
  forecast: { date: string; icon: string; tempMin: number; tempMax: number }[];
}

export interface WeatherContextType {
  error: string | null;
  weather: WeatherData | null;
  fetchWeather: (city: string) => Promise<void>;
}

// Apenas a criação do contexto
export const WeatherContext = createContext<WeatherContextType | undefined>(undefined);