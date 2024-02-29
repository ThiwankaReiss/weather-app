import React, { useState, useEffect } from 'react';
import DisplayDetail from './components/displayDetail';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const searchVal = "Panadura";
  const apiKey = "5a3b5d0257934ff585884032242802";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchVal}`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, [apiKey, searchVal]);

  return (
    <div>
      {weatherData && (
        <DisplayDetail
          cityName={weatherData.location.name}
          countryName={weatherData.location.country}
          region={weatherData.location.region}
          temeperatureC={weatherData.current.temp_c}
          temeperatureF={weatherData.current.temp_f}
          weatherCondition={weatherData.current.condition.text}
          windSpeedKph={weatherData.current.wind_kph}
          windSpeedMph={weatherData.current.wind_mph}
          humidity={weatherData.current.humidity}
          image={weatherData.current.condition.icon}
        />
      )}
    </div>
  );
}

export default App;
