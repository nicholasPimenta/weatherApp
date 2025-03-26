import { useState, useContext } from "react";
import { WeatherContext } from "../Context/WeatherContext";

export const SearchBar = () => {
  const [city, setCity] = useState("");
  const weatherContext = useContext(WeatherContext);

  if (!weatherContext) return null;
  const { fetchWeather } = weatherContext;

  const handleSearch = () => {
    if (city.trim() !== "") {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <div className="flex gap-2 p-4">
      <input
        type="text"
        placeholder="Digite a cidade..."
        className="p-2 border rounded w-full"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
        Buscar
      </button>
    </div>
  );
};