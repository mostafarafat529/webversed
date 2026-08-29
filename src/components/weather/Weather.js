import React, { useState } from "react";
import "./weather.css";
import axios from "axios";
import ApiDetails from "../apiDetails/apiDetails";
import { API_DETAILS } from "../apiDetails/apiDetailsData";
import {
  FaMagnifyingGlass,
  FaLocationDot,
  FaTemperatureHalf,
  FaDroplet,
  FaWind,
  FaGaugeHigh,
  FaClock,
  FaEye,
  FaSun,
} from "react-icons/fa6";

const Weather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchWeather = async () => {
    const city = location.trim();

    // Validate input before touching the API.
    if (!city) {
      setError("Please enter a city or location.");
      return;
    }

    // API key validation: never send an invalid request.
    if (!apiKey) {
      setError("Weather API key is not configured.");
      return;
    }

    // Prevent duplicate requests while one is already in flight.
    if (loading) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: apiKey,
            q: city,
            aqi: "no",
          },
        }
      );
      setData(response.data);
    } catch (err) {
      setData(null);
      const status = err.response?.status;

      if (status === 400) {
        setError("Location not found. Please try another city.");
      } else if (status === 401 || status === 403) {
        setError("Weather API key is invalid or unauthorized.");
      } else if (status === 429) {
        setError("Too many requests. Please wait a moment and try again.");
      } else if (typeof navigator !== "undefined" && !navigator.onLine) {
        setError("Unable to connect to the weather service. Please try again.");
      } else {
        setError("Unable to connect to the weather service. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const submit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const current = data?.current;
  const loc = data?.location;

  return (
    <div className="weather-home">
      <h1 className="weather-title">
        <FaLocationDot aria-hidden="true" /> Live Weather
      </h1>
      <form className="inp" role="search" onSubmit={submit}>
        <label htmlFor="weather-input" className="sr-only">
          Enter a city to check its weather
        </label>
        <FaMagnifyingGlass className="inp-icon" aria-hidden="true" />
        <input
          id="weather-input"
          type="text"
          placeholder="Enter a city, e.g. Cairo or London, UK"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          autoComplete="off"
        />
        <button type="submit" className="weather-go" disabled={loading}>
          {loading ? "Searching…" : "Search"}
        </button>
      </form>

      <div className="container" aria-live="polite">
        {loading && (
          <div className="state-box">
            <span className="spinner" aria-hidden="true" />
            <p className="hint">Loading weather…</p>
          </div>
        )}
        {!loading && error && (
          <div className="state-box">
            <p className="error">{error}</p>
          </div>
        )}
        {!loading && !error && !data && (
          <div className="state-box weather-empty">
            <FaLocationDot className="state-icon" aria-hidden="true" />
            <p className="hint">Search for a city to see the current weather.</p>
          </div>
        )}
        {!loading && !error && loc && current && (
          <>
            <div className="top">
              <div className="location">
                <FaLocationDot aria-hidden="true" />
                {loc.name}, {loc.country}
              </div>
              <div className="region-line">
                {loc.region && loc.region !== loc.name ? loc.region + " · " : ""}
                {loc.tz_id}
              </div>
              <img
                className="cond-icon"
                src={`https:${current.condition.icon}`}
                alt={current.condition.text}
              />
              <div className="temp">{Math.round(current.temp_c)}°C</div>
              <div className="desc">{current.condition.text}</div>
            </div>
            <div className="bottom">
              <div className="feels">
                <p>
                  <FaTemperatureHalf aria-hidden="true" />{" "}
                  {Math.round(current.feelslike_c)}°C
                </p>
                <p>Feels like</p>
              </div>
              <div className="humidity">
                <p>
                  <FaDroplet aria-hidden="true" /> {current.humidity}%
                </p>
                <p>Humidity</p>
              </div>
              <div className="wind">
                <p>
                  <FaWind aria-hidden="true" /> {current.wind_kph} kph
                </p>
                <p>Wind</p>
              </div>
              <div className="pressure">
                <p>
                  <FaGaugeHigh aria-hidden="true" /> {current.pressure_mb} mb
                </p>
                <p>Pressure</p>
              </div>
              <div className="visibility">
                <p>
                  <FaEye aria-hidden="true" /> {current.vis_km} km
                </p>
                <p>Visibility</p>
              </div>
              <div className="uv">
                <p>
                  <FaSun aria-hidden="true" /> {current.uv}
                </p>
                <p>UV Index</p>
              </div>
              {current.last_updated && (
                <div className="updated">
                  <p>
                    <FaClock aria-hidden="true" />{" "}
                    {new Date(current.last_updated.replace(" ", "T")).toLocaleString()}
                  </p>
                  <p>Last updated</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <ApiDetails meta={API_DETAILS.weather} />
    </div>
  );
};

export default Weather;