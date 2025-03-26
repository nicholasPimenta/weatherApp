import { SearchBar } from "../Components/SearchBar";
import { WeatherCard } from "../Components/WeatherCard";
import { Forecast } from "../Components/Forecast";
import { useContext, useEffect, useState } from "react";
import { WeatherContext } from "../Context/WeatherContext";

export const Home = () => {
  const { error, fetchWeather, weather } = useContext(WeatherContext) || {
    error: null,
    fetchWeather: () => {},
    weather: null,
  };

  const [isCityEmpty, setIsCityEmpty] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasWeather, setHasWeather] = useState(false);

  const handleSearch = (city: string) => {
    if (city.trim() === "") {
      setIsCityEmpty(true);
      setHasWeather(false);
      setIsError(false);
    } else {
      setIsCityEmpty(false);
      setIsError(false);
      fetchWeather(city);
    }
  };

  useEffect(() => {
    if (weather) {
      setHasWeather(true);
      setIsCityEmpty(false);
    }
    if (error) {
      setHasWeather(false);
      setIsError(true);
    }
  }, [weather, error]);

  return (
    <div className="container mx-auto p-4">
      <SearchBar onSearch={handleSearch} />

      {/* Exibir mensagem de "Digite a cidade" se o campo estiver vazio */}
      {isCityEmpty && !isError && !hasWeather && (
        <p className="text-red-500 text-center mt-4">Por favor, digite o nome da cidade.</p>
      )}

      {/* Exibir mensagem de erro se houver erro de cidade inexistente ou outros erros */}
      {isError && !isCityEmpty && !hasWeather && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}

      {/* Exibir os cards de previsão apenas se houver dados de clima válidos */}
      {hasWeather && !isCityEmpty && !isError && (
        <>
          <WeatherCard />
          <Forecast />
        </>
      )}
    </div>
  );
};