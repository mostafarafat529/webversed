import "./jokes.css"
import image1 from './images/images__1_-removebg-preview.png';
import { useState } from "react";
import axios from "axios";
import { FaFaceLaughSquint, FaSpinner } from "react-icons/fa6";
import ApiDetails from "../apiDetails/apiDetails";
import { API_DETAILS } from "../apiDetails/apiDetailsData";




const url ="https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
const Jokes = () => {

  const [joke ,setjoke] = useState("");
  const [loading, setLoading] = useState(false);

  const fun_joke = async ()=>{
    setLoading(true);
    try{
      const res = await axios.get(url) ;
      setjoke(res.data.joke)
    }catch(e){
      setjoke("Couldn't fetch a joke. Try again!");
      console.log("error is :" + e)
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='home-jokes'>
      <div className='content'>
        <img src={image1} alt=".."/>
        <p className="joke-text">{joke ? joke : "Click the button to get a random joke 😂"}</p>
        <button className='btn' onClick={()=>fun_joke()} disabled={loading}>
          {loading ? <FaSpinner className="spin" /> : <FaFaceLaughSquint />}
          {loading ? "Fetching..." : "Get Random Joke"}
        </button>
        <ApiDetails meta={API_DETAILS.jokes} />
      </div>
    </div>
  )
}

export default Jokes