import React, { useState } from 'react';
import './textspeech.css';
import { useSpeechSynthesis } from 'react-speech-kit';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const TextSpeech = () => {
  const [valuetext, setvaluetext] = useState("");
  const [valuevoice, setvaluevoice] = useState(null);
  const [range, setrange] = useState(1);

  const { speak, voices } = useSpeechSynthesis();

const navigation = useNavigate("");
  

  const convertspeech = () => {
    if (!valuetext.trim()) return;
    speak({ text: valuetext, rate: range, voice: valuevoice });
  };

  return (
    <div className='speech-home'>
      <div className='content-speech'>
        <h1>React Text to Speech</h1>

        <textarea
          placeholder='Type your text here...'
          value={valuetext}
          onChange={(e) => setvaluetext(e.target.value)}
        />

        <div className='choose'>
          <select
            onChange={(e) =>
              setvaluevoice(voices.find(v => v.name === e.target.value)) // explain
            }
          >
            <option value="">Choose voice</option>
            {voices.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <h2>Choose the speech rate</h2>
        <input
          type='range'
          className='range'
          min={0.1}
          max={2}
          step={0.1}
          value={range}
          onChange={(e) => setrange(parseFloat(e.target.value))}
        />

        <p>Rate: {range}</p>

        <button onClick={convertspeech}>Speak</button>
      </div>
                          <div className='arrow_back' onClick={()=>navigation("/")} ><FaLongArrowAltLeft/></div>
      
    </div>
  );
};

export default TextSpeech;
