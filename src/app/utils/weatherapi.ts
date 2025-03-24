import axios from "axios";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_APIKEY as string;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const weatherApi = {
  // Get current weather for a city
  getCurrentWeather: async (city: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/weather`, {
        params: {
          q: city,
          units: "imperial",
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch weather data"
      );
    }
  },

  // Get 5 day forecast for a city
  getForecast: async (city: string) => {
    try {
      const response = await axios.get(`${BASE_URL}/forecast`, {
        params: {
          q: city,
          units: "imperial",
          appid: API_KEY,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch forecast data"
      );
    }
  },

  // Get weather for multiple cities
  getMultipleCitiesWeather: async (cities: any) => {
    try {
      const promises = cities.map((city: string) =>
        axios.get(`${BASE_URL}/weather`, {
          params: {
            q: city,
            units: "imperial",
            appid: API_KEY,
          },
        })
      );
      const responses = await Promise.all(promises);
      return responses.map((response) => response.data);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch cities weather data"
      );
    }
  },
};

export default weatherApi;
