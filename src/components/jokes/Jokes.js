import "./jokes.css"
import image1 from './images/images__1_-removebg-preview.png';
import { useState } from "react";
import axios from "axios";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";




const url ="https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single"
const Jokes = () => {

  const [joke ,setjoke] = useState("");

  const navigation =useNavigate("")

  const fun_joke = async ()=>{
    try{

      const res = await axios.get(url) ;
      setjoke(res.data.joke)
      console.log(res.data.joke)
    }catch(e){
console.log("error is :" + e)
    }
  }
  return (
    <div className='home-jokes'>
      <div className='content'>
        <img src={image1} alt=".."/>
        <p>{joke ? joke:"اضغط على الزر علشان تطلعلك نكتة 😂" } </p>
            <button className='btn' onClick={()=>fun_joke()}>get random joke</button>
      </div>
              <div className='arrow' onClick={()=>navigation("/")} ><FaLongArrowAltLeft/></div>

    </div>
  )
}

export default Jokes