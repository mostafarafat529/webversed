import React, { useState } from 'react'
import "./quotes.css"
import { FaQuoteLeft, FaSpinner } from "react-icons/fa6";
import ApiDetails from "../apiDetails/apiDetails";
import { API_DETAILS } from "../apiDetails/apiDetailsData";

const Quotes = () => {
  const url = "https://api.animechan.io/v1/quotes/random" // https://animechan.io/

  const [quotes, setquotes] = useState("");
  const [anime, setanime] = useState("");
  const [name, setname] = useState("");
  const [loading, setLoading] = useState(false);


  const generate_quotes = async () => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data)
      setquotes(data.data.content);
      setanime(data.data.anime.name);
      setname(data.data.character.name);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='quotes-home'>
      <div className='content-quotes'>
        <span className='anime'>{anime ? anime : "Anime"}</span>
        <FaQuoteLeft className='quote-icon' />
        <p>{quotes ? quotes : "Click the button to get a quote"}</p>
        <span className='name'>{name ? name : "Character"}</span>
        <button className='btn-quotes' onClick={() => generate_quotes()} disabled={loading}>
          {loading && <FaSpinner className="spin" />}
          {loading ? "Loading..." : "Generate New Quote"}
        </button>
        <ApiDetails meta={API_DETAILS.quotes} />
      </div>
    </div>
  )
}

export default Quotes