import React, { useState, useEffect } from 'react';
import './textspeech.css';
import { FaVolumeHigh, FaSpinner } from "react-icons/fa6";
import ApiDetails from "../apiDetails/apiDetails";
import { API_DETAILS } from "../apiDetails/apiDetailsData";

const TextSpeech = () => {
  const [valuetext, setvaluetext] = useState("");
  const [valuevoice, setvaluevoice] = useState(null);
  const [range, setrange] = useState(1);
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  // Load voices after browser initializes them
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const convertspeech = () => {
    if (!valuetext.trim()) return;
    const utterance = new SpeechSynthesisUtterance(valuetext);
    utterance.rate = range;
    if (valuevoice) {
      utterance.voice = voices.find(v => v.name === valuevoice);
    }
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
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
            onChange={(e) => setvaluevoice(e.target.value)}
          >
            <option value="">Choose voice</option>
            {voices.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name} ({item.lang})
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

        <p className='rate'>Rate: {range}</p>

        <button onClick={convertspeech}>
          {speaking ? <FaSpinner className="spin" /> : <FaVolumeHigh />}
          {speaking ? "Speaking..." : "Speak"}
        </button>
        <ApiDetails meta={API_DETAILS.textspeech} />
      </div>
    </div>
  );
};

export default TextSpeech;
