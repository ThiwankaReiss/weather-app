import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DisplayDetail from './components/displayDetail'

const searchVal="Panadura";
let dataArray="";
const apiKey ="5a3b5d0257934ff585884032242802";

    let reop={
        methord:'GET'
    };

    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${searchVal}`,reop)
    .then(responce=> responce.json())
    .then(data => {
        console.log(data);

        // document.getElementById("tempLbl").innerHTML=data["current"]["temp_c"]+"C";
        // document.getElementById("textLbl").innerHTML=data["current"]["condition"]["text"];
        dataArray=data;

        // document.getElementById("img").src="https://"+data["current"]["condition"]["icon"];
        
    })
    .then(error => console.log("error",error))


function App() {


  return (
    <div>
      <DisplayDetail  
        countryName={dataArray.location.country} 
        region={dataArray.location.region}
        temeperature={dataArray.current.temp_c}          
        weatherCondition={dataArray.current.condition.text} 
        windSpeedKph={dataArray.current.wind_kph} 
        windSpeedMph={dataArray.current.wind_mph} 
        humidity={dataArray.current.humidity}
        image={dataArray.current.condition.icon}
      ></DisplayDetail>
    </div>
  )
}


export default App
