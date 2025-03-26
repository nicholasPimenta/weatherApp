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
    <div className="flex justify-center gap-2 p-4">
      <input
        type="text"
        placeholder="Digite a cidade..."
        className="p-2 border border-purple-600 rounded outline-0 w-50 md:w-75 lg:w-100"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch} className="bg-purple-600 hover:bg-purple-800 transition text-white p-2 rounded border-none cursor-pointer">
        Buscar
      </button>
    </div>
  );
};