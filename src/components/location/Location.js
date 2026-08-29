import React, { useState } from "react";
import axios from "axios";
import "./location.css";
import ApiDetails from "../apiDetails/apiDetails";
import { API_DETAILS } from "../apiDetails/apiDetailsData";
import {
  FaMagnifyingGlass,
  FaLocationDot,
  FaMapLocationDot,
  FaTriangleExclamation,
  FaClock,
  FaFlag,
  FaGlobe,
} from "react-icons/fa6";

const LocationFinder = () => {
  const [input, setInput] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    const apiKey = process.env.REACT_APP_OPENCAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      input.trim()
    )}&key=${apiKey}&language=en`;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(url);
      const data = res.data.results?.[0];
      if (data) {
        setLocationData(data);
      } else {
        setLocationData(null);
        setError(
          'No location found for "' + input.trim() + '". Try a different city.'
        );
      }
    } catch {
      setLocationData(null);
      if (!apiKey) {
        setError(
          "Missing REACT_APP_OPENCAGE_API_KEY in your .env file. Add a valid OpenCage key to use this tool."
        );
      } else {
        setError(
          "This feature needs a valid OpenCage API key (current one looks invalid). Add a working key to REACT_APP_OPENCAGE_API_KEY, then try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const comps = locationData?.components || {};
  const tz = locationData?.annotations?.timezone;

  return (
    <div className="loc-home">
      <div className="content-loc">
        <h1>
          <FaLocationDot /> Location Info Finder
        </h1>

        <form className="loc-search" role="search" onSubmit={handleSearch}>
          <label htmlFor="loc-input" className="sr-only">
            Enter a city or country
          </label>
          <FaMagnifyingGlass className="loc-search-icon" aria-hidden="true" />
          <input
            id="loc-input"
            type="text"
            placeholder="Enter a city or country, e.g. Paris or Egypt"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
        </form>
        <button className="loc-btn" onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>

        {error && (
          <p className="loc-error">
            <FaTriangleExclamation aria-hidden="true" /> {error}
          </p>
        )}

        {locationData && (
          <div className="loc-result">
            <p className="loc-formatted">
              <strong>Address:</strong> {locationData.formatted}
            </p>

            <div className="loc-grid">
              <div>
                <strong>City</strong>
                <span>{comps.city || comps.town || comps.village || "—"}</span>
              </div>
              <div>
                <strong>State</strong>
                <span>{comps.state || comps.county || "—"}</span>
              </div>
              <div>
                <strong>Country</strong>
                <span>
                  <FaGlobe aria-hidden="true" /> {comps.country || "—"}
                  {comps.country_code ? ` (${comps.country_code.toUpperCase()})` : ""}
                </span>
              </div>
              <div>
                <strong>Postcode</strong>
                <span>{comps.postcode || "—"}</span>
              </div>
            </div>

            <div className="loc-coords">
              <div>
                <strong>Latitude</strong>
                <span>{locationData.geometry.lat}</span>
              </div>
              <div>
                <strong>Longitude</strong>
                <span>{locationData.geometry.lng}</span>
              </div>
            </div>

            {tz && (
              <p className="loc-tz">
                <FaClock aria-hidden="true" /> Timezone: {tz.name} (UTC{" "}
                {tz.offset_string || ""})
              </p>
            )}

            {locationData.annotations?.flag && (
              <p className="loc-flag">
                <FaFlag aria-hidden="true" /> {locationData.annotations.flag}
              </p>
            )}

            <a
              className="loc-map-link"
              href={`https://www.google.com/maps?q=${locationData.geometry.lat},${locationData.geometry.lng}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaMapLocationDot /> Open in Google Maps
            </a>
          </div>
        )}

        <ApiDetails meta={API_DETAILS.location} />
      </div>
    </div>
  );
};

export default LocationFinder;