"use client";

import React, { useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { convertTemperature, formatTemperature } from "../utils/temperature";

const LoadingState = () => {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/4 mb-4">
        <div className="grid grdi-cols-1 md:grid-cols-2 gap-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-gray-700 rounded-lg p-4 h-24"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CityWeatherCardProps {
  city: any;
  unit: string;
  onRemove: any;
}
const CityWeatherCard = ({ city, unit, onRemove }: CityWeatherCardProps) => {
  const temp = convertTemperature(city.main.temp, unit);
  const WeatherIcon = city.weather[0]?.icon;
  const description = city.weather[0]?.description;

  return (
    <div className="bg-[#1e1e1e] rounded-lg p-4 relative groupe">
      <button
        onClick={() => onRemove(city.id)}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-100 group-hover:opacity-100 transition-opacity"
        aria-label="Remove city"
      >
        <FaTimes />
      </button>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{city.name}</h3>
          <p className="text-sm text-gray-400">{city.sys.country}</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold">
            {formatTemperature(temp, unit)}
          </div>
          <div className="text-sm text-gray-400 capitalize">{description}</div>
        </div>
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${WeatherIcon}.png`}
        alt={description}
        className="w-12 h-12 mx-auto mt-2"
      />
    </div>
  );
};

interface AddCityModalPorps {
  isOpen: any;
  onClose: any;
  onAdd: any;
  isLoading: any;
}
const AddCityModal = ({
  isOpen,
  onClose,
  onAdd,
  isLoading,
}: AddCityModalPorps) => {
  const [cityName, setCityName] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!cityName.trim()) return;
    onAdd(cityName.trim());
    setCityName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New City</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            placeholder="Enter city name..."
            className="w-full py-2 px-4 rounded-lg bg-[#363636] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            disabled={isLoading}
          />

          {/* Move buttons outside of <input> */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add City"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface OtherCountriesWeatherProps {
  citiesWeather: any;
  loading: any;
  unit: any;
  onAddCity: any;
  onRemoveCity: any;
}
const OtherCountriesWeather = ({
  citiesWeather,
  loading,
  unit,
  onAddCity,
  onRemoveCity,
}: OtherCountriesWeatherProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingCity, setIsAddingCity] = useState(false);

  const handleAddCity = async (cityname: any) => {
    setIsAddingCity(true);
    try {
      await onAddCity(cityname);
    } finally {
      setIsAddingCity(false);
    }
  };

  if (loading) return <LoadingState />;

  return (
    <div className="flex-1 bg-[#1e1e1e] rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Other Cities</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 rounded-lg bg-[#363636] text-gray-300 hover:text-white hover:bg-[#404040] transition-colors"
          aria-label="Add new city"
        >
          <FaPlus />
        </button>
      </div>

      <div className="gird grid-cols-1 md:grid-cols-2 gap-4">
        {citiesWeather.map((city: any) => (
          <CityWeatherCard
            key={city.id}
            city={city}
            unit={unit}
            onRemove={onRemoveCity}
          />
        ))}
      </div>

      <AddCityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCity}
        isLoading={isAddingCity}
      />
    </div>
  );
};

export default OtherCountriesWeather;
