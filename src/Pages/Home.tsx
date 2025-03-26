import { SearchBar } from "../Components/SearchBar";
import { WeatherCard } from "../Components/WeatherCard";
import { Forecast } from "../Components/Forecast";

export const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <SearchBar />
      <WeatherCard />
      <Forecast />
    </div>
  );
};