import { useState, ReactNode } from "react";
import { fetchWeatherData } from "../Services/WeatherService";
import { WeatherContext, WeatherContextType } from "./WeatherContext";

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [weather, setWeather] = useState<WeatherContextType["weather"]>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    try {
      const data = await fetchWeatherData(city);
      if (!data) {
        console.warn("Nenhuma previsão encontrada.");
        setWeather(null);
        setError("Cidade não encontrada. Tente novamente.");
        return;
      }
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar clima:", error);
      setWeather(null);
      setError("Erro ao buscar dados do clima.");
    }
  };

  return (
    <WeatherContext.Provider value={{ weather, fetchWeather, error }}>
      {children}
    </WeatherContext.Provider>
  );
};