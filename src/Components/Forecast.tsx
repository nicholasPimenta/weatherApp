import { useContext } from "react";
import { WeatherContext } from "../Context/WeatherContext";

export const Forecast = () => {
  const weatherContext = useContext(WeatherContext);
  if (!weatherContext || !weatherContext.weather) return null;

  const today = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Filtra apenas os dias que são diferentes de hoje e pega os próximos 4 dias
  const filteredForecast = weatherContext.weather.forecast
    .filter((day) => {
      const forecastDate = new Date(day.date).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return forecastDate !== today;
    })
    .slice(0, 5); // Pega apenas os próximos 4 dias

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold text-center">
        Previsão para os próximos dias
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
        {filteredForecast.length > 0 ? (
          filteredForecast.map((day, index) => (
            <div
              key={index}
              className="text-center bg-blue-400 p-2 rounded-lg shadow-md flex flex-col justify-center items-center"
            >
              <p className="text-purple-900 text-sm lg:text-lg font-semibold">
                {new Date(day.date)
                  .toLocaleDateString("pt-BR", {
                    weekday: "long",
                    day: "2-digit",
                    month: "2-digit",
                  })
                  .replace(/^./, (match) => match.toUpperCase())}
              </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                  alt="Ícone do clima"
                  className="mx-auto mt-auto"
                />
                <div className="flex flex-col mt-auto">
                  <p className="text-sm text-gray-200">Máx: {day.tempMax}°C</p>
                  <p className="text-sm text-gray-200">Mín: {day.tempMin}°C</p>
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
