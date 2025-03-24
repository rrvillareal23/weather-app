# Ricky's Weather App

## Overview
Ricky's Weather App is a modern and responsive weather application built with Next.js and TypeScript. It provides real-time weather updates, forecasts, and highlights for a selected location. Users can also add and manage multiple cities to track their weather conditions.

## Features
- **Real-time Weather Updates**: Displays the current weather conditions for the selected location.
- **Weather Forecast**: Provides upcoming weather predictions.
- **City Management**: Users can add and remove cities to track weather in multiple locations.
- **Temperature Unit Toggle**: Supports switching between Fahrenheit and Celsius.
- **Dynamic Greeting**: Greets users based on the time of day.
- **Error Handling**: Displays appropriate messages for failed searches or API issues.

## Tech Stack
- **Frontend**: Next.js (React Framework), TypeScript, Tailwind CSS
- **State Management**: React Hooks, Context API
- **API**: OpenWeatherMap API

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16.x)
- npm or yarn

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/weather-app.git
   cd weather-app
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```
3. Create a `.env.local` file in the root directory and add your OpenWeatherMap API key:
   ```sh
   NEXT_PUBLIC_WEATHER_APIKEY=your_api_key_here
   ```
4. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
1. Search for a city using the search bar to view its weather data.
2. Click on the `+` button to add a city to the list of tracked locations.
3. Remove a city by clicking on the `X` button in the city weather card.
4. Toggle between Fahrenheit and Celsius to view temperature in preferred units.

## API Integration
This project uses the **OpenWeatherMap API** to fetch real-time weather data. The API is called using the `fetch` function in `useWeather.ts`.

## Contributing
Contributions are welcome! Feel free to submit a pull request or open an issue.

## License
This project is licensed under the **MIT License**.
