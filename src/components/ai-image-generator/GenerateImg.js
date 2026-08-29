import { useState } from 'react';
import "./generate.css";
import { FaWandMagicSparkles, FaSpinner } from "react-icons/fa6";
import ApiDetails from "../apiDetails/apiDetails";
import { API_DETAILS } from "../apiDetails/apiDetailsData";

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

const url = "https://api.openai.com/v1/images/generations";

const GenerateImg = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [inpvalue, setinpvalue] = useState("");
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!inpvalue.trim()) return;

    setloading(true);
    setError("");
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-image-1",
          prompt: inpvalue.trim(),
          n: 1,
          size: "1024x1024",
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error?.message || "Request failed");
      }

      if (data?.data?.[0]?.b64_json) {
        setImageUrl(`data:image/png;base64,${data.data[0].b64_json}`);
      } else if (data?.data?.[0]?.url) {
        setImageUrl(data.data[0].url);
      } else {
        throw new Error("No image returned");
      }
    } catch (e) {
      console.error(e);
      setError(e.message || "Failed to generate image");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className='generate-page'>
      <div className='content'>
        <div className='text'>
          AI Image <span>Generator</span>
        </div>
        <div className='image-box'>
          {imageUrl ? (
            <img src={imageUrl} alt='Generated' />
          ) : (
            <div className='image-placeholder'>
              <FaWandMagicSparkles />
              <p>Your generated image will appear here</p>
            </div>
          )}
        </div>
        <div className='form'>
          <input
            value={inpvalue}
            onChange={(e) => setinpvalue(e.target.value)}
            type='text'
            placeholder='Describe what you want to see'
            onKeyDown={(e) => { if (e.key === "Enter") generate(); }}
          />
          <button onClick={generate} className='btn' disabled={loading}>
            {loading ? <FaSpinner className="spin" /> : <FaWandMagicSparkles />}
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
        {error && <p className='error'>{error}</p>}
        <ApiDetails meta={API_DETAILS.generateimg} />
      </div>
    </div>
  );
};

export default GenerateImg;