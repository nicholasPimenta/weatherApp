import { createContext, useState, ReactNode } from "react";
import { fetchWeatherData } from "../Services/WeatherService";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  forecast: { date: string; temp: number; icon: string }[];
}

interface WeatherContextType {
  weather: WeatherData | null;
  fetchWeather: (city: string) => Promise<void>;
}

export const WeatherContext = createContext<WeatherContextType | undefined>(
  undefined
);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  const fetchWeather = async (city: string) => {
    try {
      const data = await fetchWeatherData(city);
      if (!data) {
        console.warn("Nenhuma previsão encontrada.");
        setWeather(null);
        return;
      }
      setWeather(data);
    } catch (error) {
      console.error("Erro ao buscar clima:", error);
      setWeather(null);
    }
  };

  return (
    <WeatherContext.Provider value={{ weather, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};