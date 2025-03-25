"use client";
import Highlights from "./components/Highlights";
import OtherCountriesWeather from "./components/OtherCountriesWeather";
import SearchBar from "./components/SearchBar";
import WeatherApp from "./components/WeatherApp";
import WeatherCard from "./components/WeatherCard";
import { useWeather } from "./utils/useWeather";

export default function Home() {
  const {
    weather,
    location,
    setLocation,
    forecast,
    temperatureUnit,
    setTemperatureUnit,
    highlights,
    citiesWeather,
    setCitiesWeather,
    loading,
    error,
  } = useWeather();

  const handleAddCity = async (cityname: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_APIKEY}`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const newCityWeather = await response.json();

      if (citiesWeather.some((city) => city.id === newCityWeather.id)) {
        throw new Error("City already in list");
      }

      setCitiesWeather((prev) => [...prev, newCityWeather]);
    } catch (error: any) {
      console.error("Error adding city:", error.message);
      alert(error.message);
    }
  };

  const handleRemoveCity = (cityId: number) => {
    setCitiesWeather((prev) => prev.filter((city) => city.id !== cityId));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0f0f0f] text-white">
      <div className="flex-1 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col ml-2 mb-4">
            <span className="text-lg md:text-xl lg:text-lg">
              Ricky's Weather App!
            </span>
            <span className="text-sm md:text-md lg:text-xl font-bold">
              {getGreeting()}
            </span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <SearchBar setLocation={setLocation} />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/19 border border-red-500 text-red-500 px-4 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {weather && (
            <WeatherCard
              weather={weather}
              unit={temperatureUnit}
              onToggleUnit={setTemperatureUnit}
            />
          )}
          {highlights && <Highlights highlights={highlights} />}
        </div>

        <div className="mt-6 flex flex-col md:flow-row gap-4">
          <OtherCountriesWeather
            citiesWeather={citiesWeather}
            loading={loading.cities}
            unit={temperatureUnit}
            onAddCity={handleAddCity}
            onRemoveCity={handleRemoveCity}
          />
          <WeatherApp
            forecast={forecast}
            loading={loading.forecast}
            unit={temperatureUnit}
          />
        </div>
      </div>
    </div>
  );
}
