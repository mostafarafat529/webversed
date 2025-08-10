import { useState } from 'react';
import "./generate.css";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const aPI_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const url = "https://api.openai.com/v1/images/generations";


const GenerateImg = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [inpvalue, setinpvalue] = useState("");
  const [loading, setloading] = useState(false);
  
  const navigation =useNavigate("")

  const generate = async () => {
    if (!inpvalue) return;

    setloading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${aPI_KEY}`,
        },
        body: JSON.stringify({
          prompt: inpvalue,
          n: 1,
          size: "512x512"
        })
      });

      const data = await res.json();
      setloading(false);

      if (data?.data?.[0]?.url) {
        setImageUrl(data.data[0].url);
      } else {
        console.log(data.error.message);
      }

    } catch (e) {
      console.log(e);
      setloading(false);
    }
  };

  return (
    <div className='section2'>
      <div className='content'>
        <div className='text'>AI Image <span>Generator</span></div>
        <div className='image-box'>
          <img src={imageUrl ? imageUrl : "/assets/41.jpg"} alt='Generated' />
        </div>
        <div className='form'>
          <input value={inpvalue} onChange={(e) => setinpvalue(e.target.value)} className='inp-search' type='text' placeholder='Describe what you want to see' />
          <button onClick={generate} className='btn'>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
                    <div className='arrow_back' onClick={()=>navigation("/")} ><FaLongArrowAltLeft/></div>
      
    </div>
  );
};

export default GenerateImg;
