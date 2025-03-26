import { useContext } from "react";
import { WeatherContext } from "../Context/WeatherContext";
import { faDroplet, faTemperatureHigh, faTemperatureLow, faWind } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const WeatherCard = () => {
  const weatherContext = useContext(WeatherContext);
  if (!weatherContext || !weatherContext.weather) return null;

  const {
    city,
    icon,
    country,
    tempMin,
    tempMax,
    humidity,
    windSpeed,
    temperature,
    description,
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
        <div className="flex flex-row gap-4">
          <div className="flex flex-row items-center gap-1">
            <FontAwesomeIcon className="text-xl text-red-800" icon={faTemperatureHigh} />
            <p className="text-sm">
              Máx: {Math.round(tempMax)}°C
            </p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <FontAwesomeIcon className="text-xl text-purple-600" icon={faTemperatureLow} />
            <p className="text-sm">
              Mín: {Math.round(tempMin)}°C
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-1 items-center justify-center mt-2">
          <FontAwesomeIcon className="text-xl text-green-500" icon={faWind} />
          <p className="text-sm">
            Vento: {Math.round(windSpeed)} km/h
          </p>
        </div>
        <div className="flex flex-row gap-1 items-center justify-center mt-2">
          <FontAwesomeIcon className="text-xl text-indigo-900" icon={faDroplet} />
          <p className="text-sm">
            Umidade: {humidity}%
          </p>
        </div>
      </div>
    </div>
  );
};
