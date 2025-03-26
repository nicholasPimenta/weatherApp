import { useContext } from "react";
import { WeatherContext } from "../Context/WeatherContext";

export const WeatherCard = () => {
  const weatherContext = useContext(WeatherContext);
  if (!weatherContext || !weatherContext.weather) return null;

  const { city, temperature, description, icon } = weatherContext.weather;

  return (
    <div className="bg-gray-800 text-white p-4 rounded text-center flex flex-col items-center">
      <h2 className="text-2xl font-bold">{city}</h2>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="Ícone do clima" className="w-20 h-20" />
      <p className="text-lg">{temperature}°C</p>
      <p className="capitalize">{description}</p>
    </div>
  );
};