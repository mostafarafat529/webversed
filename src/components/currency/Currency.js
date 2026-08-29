import React, { useEffect, useState } from 'react'
import "./currency.css"
import { FaExchangeAlt } from "react-icons/fa";
import ApiDetails from "../apiDetails/apiDetails";
import { API_DETAILS } from "../apiDetails/apiDetailsData";


const Currency = () => {

  const countries = "https://api.frankfurter.dev/v1/currencies"



  const [from, setfrom] = useState("AUD");
  const [to, setto] = useState("AUD");
  const [selects, setselects] = useState([]);
  const [input, setinput] = useState(1)
  const [converted, setconverted] = useState(null)



  function convert(from, to, input) {
  fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`)
    .then((resp) => resp.json())
    .then((data) => {
const convertedAmount = (input * data.rates[to]).toFixed(2);
setconverted(convertedAmount);
    });
  }

const fetched_currency = async ()=>{
  try{
    const res = await fetch(countries); const data = await res.json(); 
    console.log(data);
  setselects(Object.keys(data));
  }catch{alert("error the data")}} 

useEffect(()=>{
fetched_currency();
},[])
const exchange_country = () => {
  const temp = from;
  setfrom(to);
  setto(temp);
convert(to, from, input)
};


  return (
    <div className='home-currency'>
      <div className='content-currency'>
        <h1>Currency Converter</h1>
        <div className='selects' >
          <div className='convert-country'>
            <label>From</label>
            <select onChange={(e)=>setfrom(e.target.value)} value={from}>
              {selects.map((state,index)=>(
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className='sign-convert'>
            <FaExchangeAlt className='sign fs-2' onClick={exchange_country} />
          </div>
          <div className='convert-country'>
            <label>To</label>
            <select onChange={(e)=>setto(e.target.value)} value={to} >
              {selects.map((state,index)=>(
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
        </div>
        <div className='inps'>
          <label>Amount</label>
          <input type='number' placeholder='the amount' value={input} onChange={(e)=>setinput(e.target.value)} />
        </div>
        <p className='result'>Converted amount: {converted} {to}</p>
        <button onClick={()=>convert(from, to, input)}>Convert</button>
        <ApiDetails meta={API_DETAILS.currency} />
      </div>
    </div>
  )
}

export default Currency