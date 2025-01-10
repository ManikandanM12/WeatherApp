import React, { useEffect, useState } from 'react'
import './WeatherApp.css';
import { CiSearch } from "react-icons/ci";
import sunIcon from './images/sun.png';
import rainIcon from './images/heavy-rain.png';
import snowIcon from './images/snow.png';
import thunderIcon from './images/thunderstorms.png';
import humidityIcon from './images/humidity.png';
import windIcon from './images/windy.png';
import cloudIcon from './images/cloudy.png';
import fogIcon from './images/fog.png';
// import coldIcon from './images/cold.png';

const WeatherDetails=({icon,temp,city,country,latitude,longitude,wind,humidity})=>{
  return(
    <>
    <div className='image'>
      <img className='weatherImg' src={icon} alt="" />
      <div className="temp">{temp}°C</div>
      <div className="location_city">{city}</div>
      <div className="location_country">{country}</div>
    <div className="cord">     <div className="latitude">
      <span>Latitude</span>
      <span>{latitude}</span>
      </div> 
      <div className='longitude'><span>Longitude</span>
      <span>{longitude}</span>
      </div>
      </div></div>
<div className="data_container">
  <div className="element">
    <img src={humidityIcon} alt="" />
    <div className="humidity_percentage">{humidity}%</div>
    <div className="humidity_text">Humidity</div>
  </div>
  <div className="element">
    <img src={windIcon} alt="" />
    <div className="wind_percentage">{wind}km/hr</div>
    <div className="wind_text">Wind speed</div>
  </div>
</div>
<p className='copyright'>Design by manikandan</p>

      </>
  )
}



const WeatherApp = () => {
const [icon,setIcon]=useState(sunIcon)
const [text,setText]=useState("London")
const [temp,setTemp]=useState(0)
const [city,setCity]=useState()
const [country,setCountry]=useState()
const [latitude,setLatitude]=useState(0)
const [longitude,setLongitude]=useState(0)
const [wind,setWind]=useState("10")
const [humidity,setHumidity]=useState("85")

const HandleCity=(e)=>{
setText(e.target.value)

}

const HandleKeyDown=(e)=>{
  if(e.key=="Enter"){
    search()
  }



}
useEffect(function(){
  search()
 },[]
)


const search=async ()=>{

  let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=f2dc2a8b6d15e5d15f8bef7d15427ddf&unit=standard`
  let response=await fetch(url)
  let data=await response.json()
 setTemp((data.main.temp-273).toFixed(2))
 setCountry(data.sys.country)
 setCity(data.name)
 setLatitude(data.coord.lat)
 setLongitude(data.coord.lon)
 setWind(data.wind.speed)
 setHumidity(data.main.humidity)
 setIcon(data.weather[0].icon=="50d"?(fogIcon):data.weather[0].icon=="01d"?(sunIcon):data.weather[0].icon=="13d"?(snowIcon):data.weather[0].icon=="11d"?(thunderIcon):data.weather[0].icon=="10d"?(rainIcon):data.weather[0].icon=="09d"?(coldIcon):(sunIcon))

}
  return(
<div className='container'>
  
  <div className="input_container">
    <input className='cityInput' value={text} onKeyDown={HandleKeyDown} type='text' onChange={HandleCity} placeholder='Search the City'></input>  
    <div className="search_icon"><CiSearch onClick={()=>{search()}} className='Search_icon'  />
  </div>
 
  </div>
  
  
 
 <WeatherDetails icon={icon} temp={temp} city={city} country={country} latitude={latitude} longitude={longitude} wind={wind} humidity={humidity} />
</div>
 





  )
}

export default WeatherApp