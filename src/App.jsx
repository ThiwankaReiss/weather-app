import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import DisplayDetail from './components/displayDetail';
import './App.css';


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const searchVal = "Panadura";
  const apiKey = "5a3b5d0257934ff585884032242802";

  const { handleSubmit, register } = useForm();

  const submit = (data) => {
    console.log(data);
  }

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


            <div className="container">
              <div className="row">
                <div className="input-group has-validation col-lg-12">
                  <span className="input-group-text"><i class="bi bi-globe-americas"></i></span>
                  <input type="text" {...register("email")} class="form-control" id="username" placeholder="City/Town/Village" required>
                  </input>

                </div>
                <div className='col-lg-6'>
                </div>
                <div className='col-lg-6 mt-2'>
                  <button onClick={handleSubmit(submit)} className="w-100 btn btn-md btn-primary" type="submit">Find Weather</button>
                </div>
              </div>

            </div>


          </div>
        </div>
        <div className='col-lg-3'>
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
