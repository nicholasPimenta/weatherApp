import axios from "axios";

const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "INSERT_KEY_HERE"; // Substitua pela sua chave da API

// Definindo a interface para o item de previsão (Forecast)
interface Forecast {
  date: string;
  tempMin: number;
  tempMax: number;
  icon: string;
}

// Definindo a interface para os dados climáticos principais (WeatherData)
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
  forecast: Forecast[]; // Usando o tipo Forecast para previsão
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

    // Requisição para a previsão do tempo (5 dias)
    const forecastResponse = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        units: "metric",
        lang: "pt",
        appid: API_KEY,
      },
    });

    // Organizando os dados de previsão (5 dias)
    const forecast: Forecast[] = forecastResponse.data.list
      .filter((item: { dt_txt: string }) => item.dt_txt.includes("12:00:00")) // Pegamos registros de meio-dia
      .slice(0, 5) // Pegamos os próximos 5 dias
      .map((item: { dt_txt: string; main: { temp: number; temp_min: number; temp_max: number }; weather: [{ icon: string }] }) => ({
        date: item.dt_txt.split(" ")[0], // Extraímos a data no formato YYYY-MM-DD
        tempMin: Math.round(item.main.temp_min), // Temperatura mínima
        tempMax: Math.round(item.main.temp_max), // Temperatura máxima
        icon: item.weather[0].icon, // Ícone do clima
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
      forecast: forecast, // Adiciona a previsão no retorno
    };
  } catch (error) {
    console.error("Erro ao buscar dados do clima:", error);
    return null;
  }
};