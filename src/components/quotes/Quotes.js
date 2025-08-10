import React, { useState } from 'react'
import "./quotes.css"
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Quotes = () => {
  const url = "https://api.animechan.io/v1/quotes/random" // https://animechan.io/

  const [quotes,setquotes] = useState("");
  const [anime,setanime] = useState("");
  const [name,setname] = useState("");
const navigation = useNavigate("");


const generate_quotes = ()=>{
  try{

    fetch(url).then((res)=>res.json()).then((data)=>{
      console.log(data)
      setquotes(data.data.content);
      setanime(data.data.anime.name)
      setname(data.data.character.name)
    }
  )
} catch(e){
  console.log(e)
}
}
  return (
    <div className='quotes-home'>
      <div className='content-quotes'>
        <span className='anime'>{anime ? anime : "anime"}</span>
        <p>{quotes ? quotes : "click on the button to get quotes"}</p>
        <span className='name'>{name ? name:"character"}</span>
        <button className='btn-quotes' onClick={()=>generate_quotes()}>generate new quote</button>
      </div>
              <div className='arrow_back' onClick={()=>navigation("/")} ><FaLongArrowAltLeft/></div>
      
    </div>
  )
}

export default Quotes