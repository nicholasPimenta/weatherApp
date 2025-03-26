import axios from "axios";

// Definir tipos para os dados de previsão e clima
interface ForecastItem {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: Array<{
    icon: string;
  }>;
}

interface WeatherData {
  city: string;
  temperature: number;
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
    // Requisição para o clima atual
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: "metric",
        lang: "pt",
        appid: API_KEY,
      },
    });

    // Requisição para a previsão do tempo (5 dias)
    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: "metric",
        lang: "pt",
        appid: API_KEY,
      },
    });

    // Se os dados da previsão não existirem, evitamos retornar um objeto vazio
    if (!forecastResponse.data.list || forecastResponse.data.list.length === 0) {
      console.warn("Nenhuma previsão disponível para esta cidade.");
      return null;
    }

    // Filtramos apenas as previsões do meio-dia (12:00:00) e pegamos os próximos 5 dias
    const forecastData = forecastResponse.data.list
      .filter((item: ForecastItem) => item.dt_txt.includes("12:00:00"))
      .slice(0, 5)
      .map((item: ForecastItem) => ({
        date: item.dt_txt.split(" ")[0], // Formato YYYY-MM-DD
        temp: Math.round(item.main.temp), // Arredondamos a temperatura
        icon: item.weather[0].icon,
      }));

    return {
      city: response.data.name,
      temperature: Math.round(response.data.main.temp),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      forecast: forecastData,
    };
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    return null;
  }
};