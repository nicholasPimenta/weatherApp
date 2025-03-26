import { useState, ReactNode } from "react";
import { WeatherContext, WeatherContextType } from "./WeatherContext";
import { fetchWeatherData } from "../Services/WeatherService";

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherContextType["weather"]>(null);

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