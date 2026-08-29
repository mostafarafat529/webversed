import React, { useEffect, useState } from 'react'

import PrayerTimes from './PrayerTimes';
import "./homeprayer.css"
import { FaLocationDot } from "react-icons/fa6";
import ApiDetails from "../apiDetails/apiDetails";
import { API_DETAILS } from "../apiDetails/apiDetailsData";

export const HomePrayer = () => {


  const [data, setData] = useState([]);
  const [select, setSelect] = useState("Cairo");
  const [date, setdate] = useState("")

  useEffect(() => {
    fetch(`https://api.aladhan.com/v1/timingsByAddress?address=${select},Egypt&method=8`)
      .then((res) => res.json())
      .then((req) => {
        console.log(req.data)
        setData(req.data.timings);
        setdate(req.data.date.readable)
      })
      .catch(() => setData([]));
  }, [select]);




  const cities = [
    { name: "القاهرة", value: "Cairo" },
    { name: "الإسكندرية", value: "Alexandria" },
    { name: "أسوان", value: "Aswan" },
    { name: "المنصورة", value: "Mansoura" },
    { name: "سوهاج", value: "Sohag" },
    { name: "قنا", value: "Qena" },
    { name: "الفيوم", value: "Faiyum" },
    { name: "الجيزة", value: "Giza" },
    { name: "الشرقية", value: "Zagazig" },
    { name: "مرسى مطروح", value: "Marsa Matruh" },
    { name: "شمال سيناء", value: "North Sinai" },
    { name: "جنوب سيناء", value: "South Sinai" },
    { name: "السويس", value: "Suez" },
  ];



  return (
    <div className='section_home'>
      <div className='contain'>
        <div className='section-top'>
          <div className='date'>
            <h3><FaLocationDot /> {select}</h3>
            <h4>{date}</h4>
          </div>
          <div className='city'>
            <h1>المدينه</h1>
            <select id='cites' onChange={(e) => setSelect(e.target.value)}>
              {cities.map((item, index) => (
                <option key={index} value={item.value}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
        <PrayerTimes name={"الفجر"} date={data.Fajr} />
        <PrayerTimes name={"الظهر"} date={data.Dhuhr} />
        <PrayerTimes name={"العصر"} date={data.Asr} />
        <PrayerTimes name={"المغرب"} date={data.Maghrib} />
        <PrayerTimes name={"العشاء"} date={data.Isha} />
        <ApiDetails meta={API_DETAILS.prayertimes} />
      </div>
    </div>
  )
}
export default HomePrayer