import { useState, useEffect, ReactNode } from "react";
import weatherApi from "./weatherapi";

interface WeatherData {
  weather: any;
  main: any;
  name: string;
  sys: { country: string };
}

export const useWeather = (initialLocation = "Rancho Santa Margarita") => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [highlights, setHighlights] = useState<{
    wind: number;
    humidity: number;
    uv: number;
    visibility: string;
    sunrise: string;
    sunset: string;
  } | null>(null);
  const [location, setLocation] = useState(initialLocation);
  const [forecast, setForecast] = useState(null);
  const [cities, setCities] = useState(["London", "Tokyo"]);
  const [citiesWeather, setCitiesWeather] = useState<any[]>([]);
  const [temperatureUnit, setTemperatureUnit] = useState("F");
  const [loading, setLoading] = useState({
    weather: true,
    forecast: true,
    cities: true,
  });
  const [error, setError] = useState(null);

  const processHighlights = (weatherData: {
    wind: any;
    main: any;
    visibility: any;
    sys: any;
  }) => {
    const { wind, main, visibility, sys } = weatherData;
    return {
      wind: wind.speed,
      humidity: main.humidity,
      uv: 0,
      visibility: (visibility / 1000).toFixed(1),
      sunrise: new Date(sys.sunrise * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sunset: new Date(sys.sunset * 1000).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const fetchWeatherData = async () => {
    try {
      setError(null);
      setLoading((prev) => ({ ...prev, weather: true }));
      const weatherData = await weatherApi.getCurrentWeather(location);

      console.log("Weather API Response:", weatherData); // Debug response

      setWeather(weatherData);
      setHighlights(processHighlights(weatherData));
    } catch (error: any) {
      setError(error.message);
      console.log("Error fetching weather:", error);
    } finally {
      setLoading((prev) => ({ ...prev, weather: false }));
    }
  };

  const fetchForecastData = async () => {
    try {
      setLoading((prev) => ({ ...prev, forecast: true }));
      const forecastData = await weatherApi.getForecast(location);
      const dailyForecasts = forecastData.list
        .filter((item: any, index: number) => index % 8 === 0)
        .slice(0, 5);
      setForecast(dailyForecasts);
    } catch (error: any) {
      setError(error.message);
      console.log("Error fetching forecast: ", error);
    } finally {
      setLoading((prev) => ({ ...prev, forecast: false }));
    }
  };

  const fetchCitiesWeatherData = async () => {
    try {
      setLoading((prev) => ({ ...prev, cities: true }));
      const weatherData = await weatherApi.getMultipleCitiesWeather(cities);
      setCitiesWeather(weatherData);
    } catch (error: any) {
      setError(error.message);
      console.log("Error fetching cities weather: ", error);
    } finally {
      setLoading((prev) => ({ ...prev, cities: false }));
    }
  };

  useEffect(() => {
    fetchWeatherData();
    fetchForecastData();
  }, [location]);

  useEffect(() => {
    fetchCitiesWeatherData();
  }, [cities]);

  return {
    weather,
    highlights,
    location,
    setLocation,
    forecast,
    citiesWeather,
    setCitiesWeather,
    temperatureUnit,
    setTemperatureUnit,
    loading,
    error,
  };
};
