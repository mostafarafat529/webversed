import { Routes ,Route } from "react-router-dom";
import Quotes from "./components/quotes/Quotes";
import Currency from "./components/currency/Currency";
import GenerateImg from "./components/ai-image-generator/GenerateImg";
import Jokes from "./components/jokes/Jokes";
import Location from "./components/location/Location";
import TextSpeech from "./components/text-to-speech/TextSpeech";
import UploadImage from "./components/upload-image/UploadImage";
import Weather from "./components/weather/Weather";
import Newsapp from "./components/newsapp/Newsapp";
import "./App.css"
import Home from "./components/navbar/Home";
import HomePrayer from "./components/prayer-times/HomePrayer";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/generateimg" element={<GenerateImg/>} />
        <Route path="/currency" element={<Currency/>} />
        <Route path="/jokes" element={<Jokes/>} />
        <Route path="/location" element={<Location/>} />
        <Route path="/news" element={<Newsapp/>} />
        <Route path="/prayertimes" element={<HomePrayer/>} />
        <Route path="/quotes" element={<Quotes/>} />
        <Route path="/textspeech" element={<TextSpeech/>} />
        <Route path="/uploadimg" element={<UploadImage/>} />
        <Route path="/weather" element={<Weather/>} />
      </Routes>

    </div>
  );
}

export default App;
