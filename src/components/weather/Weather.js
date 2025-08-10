import React, { useState } from 'react'
import "./weather.css"
import axios from 'axios';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Weather = () => {

  // const url = `http://api.weatherapi.com/v1/current.json?key=5512a2e0c87e473ea3d230408250607&q=london&aqi=no`
  
  const [data,setdata] = useState({});
  const [location ,setlocation] = useState("");
  const navigation =useNavigate("")


  const url = `http://api.weatherapi.com/v1/current.json?key=5512a2e0c87e473ea3d230408250607&q=${location}&aqi=no`
  
  const fun = async ()=>{
    const fetched = await axios.get(url) ;
    console.log(fetched.data.location.name)
    setdata(fetched.data)
  }


  
  return (
    <div className='weather-home'>
        <div className='inp'>
        <input type='text' onKeyUp={(e)=>{if(e.key === "Enter"){fun();} }} placeholder='enter the location' value={location} onChange={(e)=>setlocation(e.target.value)}/>
        </div>

<div className='container'>
  {data.location ? (
    <>
      <div className='top'>
        <div className='location'>
          {data.location.name}
        </div>
        <div className='temp'>
          {data.current.temp_c}°C
        </div>
        <div className='desc'>
          {data.current.condition.text}
        </div>
      </div>
      <div className='bottom'>
        <div className='feels'>
          <p>{data.current.feelslike_c}°C</p>
          <p>Feels like</p>
        </div>
        <div className='humidity'>
          <p>{data.current.humidity}%</p>
          <p>Humidity</p>
        </div>
        <div className='wind'>
          <p>{data.current.wind_kph} kph</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </>
  ) : (
    <p style={{ textAlign: "center" }}>Enter a location and press Enter ⏎</p>
  )}
</div>
                    <div className='arrow_back' onClick={()=>navigation("/")} ><FaLongArrowAltLeft/></div>
    </div>
  )
}

export default Weather