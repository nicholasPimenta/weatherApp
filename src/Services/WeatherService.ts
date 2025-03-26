import axios from "axios";

interface WeatherData {
  city: string;
  temperature: number;
  country: string;
  tempMin: number;
  tempMax: number;
  windSpeed: number;
  humidity: number;
  description: string;
  icon: string;
  forecast: Array<{
    date: string;
    temp: number;
    icon: string;
  }>;
}

const API_KEY = "INSERT_KEY_HERE";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchWeatherData = async (city: string): Promise<WeatherData | null> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: "metric",
        lang: "pt",
        appid: API_KEY,
      },
    });

    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: "metric",
        lang: "pt",
        appid: API_KEY,
      },
    });

    return {
      city: response.data.name,
      country: response.data.sys.country, // Pegando a sigla do país corretamente
      temperature: Math.round(response.data.main.temp),
      tempMin: Math.round(response.data.main.temp_min),
      tempMax: Math.round(response.data.main.temp_max),
      windSpeed: Math.round(response.data.wind.speed * 3.6), // Convertendo de m/s para km/h
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      forecast: forecastResponse.data.list
        .filter((item: { dt_txt: string }) => item.dt_txt.includes("12:00:00"))
        .slice(0, 5)
        .map((item: { dt_txt: string; main: { temp: number }; weather: { icon: string }[] }) => ({
          date: item.dt_txt.split(" ")[0],
          temp: Math.round(item.main.temp),
          icon: item.weather[0].icon,
        })),
    };
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    return null;
  }
};