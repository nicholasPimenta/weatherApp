import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "INSERT_KEY_HERE"; // Substitua pela sua chave da API

interface Forecast {
  date: string;
  tempMin: number;
  tempMax: number;
  icon: string;
}

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
  forecast: Forecast[];
}

export const fetchWeatherData = async (city: string): Promise<WeatherData | null> => {
  try {
    // Requisição para dados atuais do clima
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        units: "metric",
        lang: "pt",
        appid: API_KEY,
      },
    });

    // Requisição para a previsão do tempo (4 dias)
    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: "metric",
        lang: "pt",
        appid: API_KEY,
      },
    });

    // Organizando os dados de previsão (4 dias)
    const dailyForecast: {
      [key: string]: { min: number; max: number; icon: string };
    } = {};

    forecastResponse.data.list.forEach(
      (item: {
        dt_txt: string;
        main: { temp: number };
        weather: [{ icon: string }];
      }) => {
        const date = item.dt_txt.split(" ")[0];

        if (!dailyForecast[date]) {
          dailyForecast[date] = {
            min: item.main.temp,
            max: item.main.temp,
            icon: item.weather[0].icon,
          };
        } else {
          dailyForecast[date].min = Math.min(
            dailyForecast[date].min,
            item.main.temp
          );
          dailyForecast[date].max = Math.max(
            dailyForecast[date].max,
            item.main.temp
          );
        }
      }
    );

    const today = new Date().toISOString().split("T")[0];

    const forecast: Forecast[] = Object.entries(dailyForecast)
      .filter(([date]) => date !== today) // Remove o dia de hoje
      .slice(0, 5) // Pegamos os próximos 4 dias
      .map(([date, data]) => ({
        date,
        tempMin: Math.round(data.min),
        tempMax: Math.round(data.max),
        icon: data.icon,
      }));

    // Retorna os dados do clima com a previsão
    return {
      city: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      country: response.data.sys.country,
      tempMin: response.data.main.temp_min,
      tempMax: response.data.main.temp_max,
      windSpeed: response.data.wind.speed,
      humidity: response.data.main.humidity,
      forecast: forecast,
    };
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    return null;
  }
};