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
    <div className='container-fluid'>
      <div className='row backImage'>
        <div className='col-lg-9'>
          <div class="col-md-6 p-lg-5 mx-auto my-5">
            <h1 class="display-3 fw-bold text-warning">Weather App</h1>
            <h3 class="fw-normal text-info mb-3">Enter Your City Name ?</h3>
            
              <div class="input-group has-validation">
                <span class="input-group-text"><i class="bi bi-globe-americas"></i></span>
                <input type="text" class="form-control" id="username" placeholder="City/Town/Village" required>

                </input>
              </div>
            </div>
        </div>
        <div  className='col-lg-3'>
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
      </div>
      
    </div>
  );
}

export default App;
