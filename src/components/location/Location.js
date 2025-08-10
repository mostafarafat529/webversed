import React, { useState } from "react";
import axios from "axios";
import "./location.css"
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const LocationFinder = () => {
  const [input, setInput] = useState("");
  const [locationData, setLocationData] = useState(null);
  const navigation =useNavigate("")


  const handleSearch = async () => {
    if (!input) return;

    const ApiKey = process.env.REACT_APP_OPENAI_API_KEY2;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${input}&key=${ApiKey}`;

    try {
      const res = await axios.get(url);
      const data = res.data.results[0];

      if (data) {
        setLocationData(data);
      } else {
        setLocationData(null);
        alert("Location not found!");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching location data");
    }
  };

  return (
    <div className="loc-home">
      <div className="content-loc">

      <h2>🌍 Location Info Finder</h2>
      <input type="text"placeholder="Enter a city or country"value={input}onChange={(e) => setInput(e.target.value)}
        onKeyUp={(e) => { if (e.key === "Enter") handleSearch();}}/>
      <button onClick={handleSearch} >🔍 Search </button>

      {locationData && (
        <div style={{ marginTop: "2rem" }}>
          <p className="text-light fs-2"><strong>Address:</strong> {locationData.formatted}</p>
          <p className="text-light fs-2"><strong>Country:</strong> {locationData.components.country}</p>
          <p className="text-light fs-2"><strong>Latitude:</strong> {locationData.geometry.lat}</p>
          <p className="text-light fs-2"><strong>Longitude:</strong> {locationData.geometry.lng}</p>
          <a className=" fs-2"
            href={`https://www.google.com/maps?q=${locationData.lat},${locationData.lng}`}
            target="_blank"
            rel="noreferrer"
            >
            📍 Open in Google Maps
          </a>
        </div>
      )}
            </div>
                    <div className='arrow_back' onClick={()=>navigation("/")} ><FaLongArrowAltLeft/></div>
            
    </div>
  );
};

export default LocationFinder;
