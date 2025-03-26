import { useContext } from "react";
import { WeatherContext } from "../Context/WeatherContext";

export const WeatherCard = () => {
  const weatherContext = useContext(WeatherContext);
  if (!weatherContext || !weatherContext.weather) return null;

  const {
    city,
    country,
    temperature,
    tempMin,
    tempMax,
    windSpeed,
    humidity,
    description,
    icon,
  } = weatherContext.weather;

  return (
    <div className="bg-blue-500 text-white p-6 rounded-lg text-center flex flex-col items-center justify-center shadow-lg w-full sm:w-80 md:w-96 lg:w-100 mx-auto">
      <h2 className="text-2xl font-bold">
        {city}, {country}
      </h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Ícone do clima"
        className="w-20 h-20"
      />
      <p className="text-xl font-semibold">{Math.round(temperature)}°C</p>
      <p className="capitalize text-gray-300">{description}</p>
      <div className="mt-4 space-y-1">
        <p className="text-sm">
          🌡️ Mín: {Math.round(tempMin)}°C | Máx: {Math.round(tempMax)}°C
        </p>
        <p className="text-sm">💨 Vento: {Math.round(windSpeed)} km/h</p>
        <p className="text-sm">💧 Umidade: {humidity}%</p>
      </div>
    </div>
  );
};
