import { useContext } from "react";
import { WeatherContext } from "../Context/WeatherContext";

export const Forecast = () => {
  const weatherContext = useContext(WeatherContext);
  if (!weatherContext || !weatherContext.weather) return null;

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-center">
        Previsão para os próximos 5 dias
      </h3>
      <div className="flex justify-around mt-2">
        {weatherContext.weather.forecast &&
        weatherContext.weather.forecast.length > 0 ? (
          weatherContext.weather.forecast.map((day, index) => (
            <div
              key={index}
              className="text-center bg-blue-500 p-2 rounded-lg shadow-md"
            >
              <p className="text-gray-700 font-semibold">
                {new Date(day.date).toLocaleDateString("pt-BR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "2-digit",
                }).replace(/^./, (match) => match.toUpperCase())} {/* Torna a primeira letra maiúscula */}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt="Ícone do clima"
                className="mx-auto"
              />
              <div className="flex flex-col justify-center">
                <p className="text-sm text-gray-200">
                  Máx: {day.tempMax}°C
                </p>
                <p className="text-sm text-gray-200">
                  Mín: {day.tempMin}°C
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            Nenhuma previsão disponível.
          </p>
        )}
      </div>
    </div>
  );
};