import React from "react";
import { FaMapMarkedAlt, FaWind } from "react-icons/fa";
import moment from "moment-timezone";
import { convertTemperature, formatTemperature } from "../utils/temperature";
import TemperatureToggle from "./TemperatureToggle";

interface LocationHeaderProps {
  name: string;
  country: string;
}

const LocationHeader = ({ name, country }: LocationHeaderProps) => {
  return (
    <div className="flex items-center p-2 rounded-lg bg-[#363636]">
      <FaMapMarkedAlt className="text-sm md:text-lg mr-2 text-gray-300" />
      <h2 className="text-sm md:text-lg font-normal">
        {name}, {country}
      </h2>
    </div>
  );
};

interface DateDisplayProps {
  date: moment.Moment;
}

const DateDisplay = ({ date }: DateDisplayProps) => {
  return (
    <div className="text-left mb-4">
      <h3 className="md:text-3xl text-xl font-semibold">
        {date.format("dddd")}
      </h3>
      <h3 className="md:text-xl text-md mt-2 text-gray-300">
        {date.format("DD, MMM, YYYY")}
      </h3>
    </div>
  );
};

interface WeatherIconProps {
  icon: string;
  description: string;
}

const WeatherIcon = ({ icon, description }: WeatherIconProps) => {
  return (
    <div>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="w-24 h-24 md:w-36 md:h-36 mb-4"
      />
    </div>
  );
};

interface WeatherDetailsProps {
  wind: string;
  humidity: number;
  pressure: number;
  visibility: number;
}

const WeatherDetails = ({
  wind,
  humidity,
  pressure,
  visibility,
}: WeatherDetailsProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      <div className="flex items-center gap-2 text-gray-300">
        <FaWind className="text-lg" />
        <span>{wind}</span>
      </div>

      <div className="flex items-center justify-end gap-2 text-gray-300">
        <FaWind className="text-lg" />
        <span>{humidity}%</span>
      </div>

      <div className="flex items-center gap-2 text-gray-300">
        <span>Pressure: </span>
        <span>{pressure} hPa</span>
      </div>

      <div className="flex items-center justify-end gap-2 text-gray-300">
        <span>Visibility: </span>
        <span>{(visibility / 1000).toFixed(1)} km</span>
      </div>
    </div>
  );
};

interface TemperatureDisplayProps {
  temp: number;
  feelsLike: number;
  description: string;
  unit: string;
}

const TemperatureDisplay = ({
  temp,
  feelsLike,
  description,
  unit,
}: TemperatureDisplayProps) => {
  return (
    <div className="text-center">
      <div className="md:text-6xl text-4xl text-right font-bold">
        {formatTemperature(temp, unit)}
      </div>

      <div className="text-2xl text-right text-gray-200">
        / {formatTemperature(feelsLike, unit)}
      </div>

      <div className="md:text-2xl text-xl capitalize mt-2 text-right">
        {description}
      </div>
      <div className="mt-2 text-right text-gray-200">
        Feels like: {formatTemperature(feelsLike, unit)}
      </div>
    </div>
  );
};

interface WeatherCardProps {
  weather: any;
  unit: string;
  onToggleUnit: (unit: string) => void;
}

const WeatherCard = ({ weather, unit, onToggleUnit }: WeatherCardProps) => {
  if (!weather) return null;

  const {
    main,
    weather: weatherData,
    name,
    sys,
    timezone,
    wind,
    visibility,
  } = weather;

  const weatherIcon = weatherData[0]?.icon;
  const weatherDescription = weatherData[0]?.description;

  const timeZoneName = moment.tz.guess();
  const date = moment().tz(timeZoneName);

  const temp = convertTemperature(main.temp, unit);
  const feelsLike = convertTemperature(main.feels_like, unit);

  return (
    <div className="rounded-xl p-6 flex-1 shadow-lg bg-[#1e1e1e] text-white">
      <div className="flex justify-between items-center mb-4">
        <LocationHeader name={name} country={sys.country} />
        <TemperatureToggle unit={unit} onToggle={onToggleUnit} />
      </div>

      <DateDisplay date={date} />

      <div className="flex justify-between items-center">
        <WeatherIcon icon={weatherIcon} description={weatherDescription} />
        <TemperatureDisplay
          temp={temp}
          feelsLike={feelsLike}
          description={weatherDescription}
          unit={unit}
        />
      </div>

      <WeatherDetails
        wind={`${wind.speed} m/s`}
        humidity={main.humidity}
        pressure={main.pressure}
        visibility={visibility}
      />
    </div>
  );
};

export default WeatherCard;
