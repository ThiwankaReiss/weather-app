import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import DisplayDetail from './components/displayDetail';
import './App.css';
import Swal from 'sweetalert2'

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [searchVal, setSearchVal] = useState("Panadura");
  const apiKey = "5a3b5d0257934ff585884032242802";

  const { handleSubmit, register ,formState:{errors} } = useForm();

  const submit = (data) => {
    console.log(data);

    setSearchVal(data.city);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchVal}`);
        const data = await response.json();
        console.log(data)
//         error: {code: 1006, message: 'No matching location found.'

        if(data.error && data.error.code== 1006){
          console.log("No matching location found.");
          
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No matching location found.",
            footer: 'Enter Valid Location'
          });
          document.getElementById('city').value="";
        }else{
          setWeatherData(data);
        }
        
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
          <div className="col-md-6 p-lg-5 mx-auto my-5">
            <h1 className="display-3 fw-bold text-warning">Weather App</h1>
            <h3 className="fw-normal text-info mb-3">Enter Your City Name ?</h3>


            <div className="container">
              <div className="row">
                <div className="input-group has-validation col-lg-12">
                  <span className="input-group-text"><i className="bi bi-globe-americas"></i></span>
                  <input type="text" {...register("city",{required:true})} className="form-control" id="city" placeholder="City/Town/Village" required>
                  </input>
                  { errors.city &&  <div className='col-lg-12 text-danger'> <span> City Not Provided &#x2191; 	&#129300;</span> </div>}
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
        <div className='col-lg-3 outer-container'>
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
