
import "./home.css"
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from "react-icons/fa";
import { useState } from "react";

const Home = () => {

const [search ,setsearch] = useState("");

const projectsData = [
  {
    name: "Currency Converter",
    image: "https://openexchangerates.org/assets/img/showcase/ddw-currency-converter.png",
    description: "Convert between multiple currencies with live exchange rates.",
    path: "/currency"
  },
  {
    name: "Random Jokes",
    image: "https://i.pinimg.com/474x/46/54/64/46546443287459b3277cb5034d00b7de.jpg",
    description: "Get a dose of laughter with random jokes from an API.",
    path: "/jokes"
  },
  {
    name: "Location Finder",
    image: "https://st.depositphotos.com/1064045/1994/i/450/depositphotos_19942491-stock-illustration-navigation.jpg",
    description: "Find your exact geolocation and coordinates.",
    path: "/location"
  },
  {
    name: "News App",
    image: "https://images.ctfassets.net/lzny33ho1g45/1myGI9Ws1d0hbffMs6BcnD/27451e44f2fcb996a40e5da797b32a37/best-news-apps-hero.jpg",
    description: "Get the latest news from multiple categories and sources.",
    path: "/news"
  },
  {
    name: "AI Image Generator",
    image: "https://wesoftyou.com/wp-content/uploads/2024/07/AI-art-statistics-thumbnail-2.jpg" ,
    description: "Generate images using AI prompts with full customization options.",
    path: "/generateimg"
  },
  {
    name: "Prayer Times",
    image: "https://media.istockphoto.com/id/1188704261/photo/time-to-pray.jpg?s=612x612&w=0&k=20&c=-UP_57nI3nK-qUxg2E7wsppiO0lbpg4XfgPtKlL5PVM=",
    description: "Get accurate daily prayer times based on your location.",
    path: "/prayertimes"
  },
  {
    name: "Inspirational Quotes",
    image: "https://img.freepik.com/free-vector/inspirational-quote-watercolour-background_1048-18831.jpg",
    description: "Read motivational quotes to start your day right.",
    path: "/quotes"
  },
  {
    name: "Text to Speech",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxJdSCgXbEwrjRbvpdTJ8mxVrBSB1h1OKE1A&s",
    description: "Convert written text into spoken words easily.",
    path: "/textspeech"
  },
  {
    name: "Image Upload",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg_ri9E8XxXRafeIMA4QGosabTMk_wP7pTDQ&s",
    description: "Upload images and preview them instantly.",
    path: "/uploadimg"
  },
  {
    name: "Weather App",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZICV0fftz_-7z6RqV753FHwIECEPSxjhi6g&s",
    description: "Check the current weather and forecasts for any city.",
    path: "/weather"
  },
];

const searchdata = projectsData.filter((item) => {
  return item.name?.toLowerCase().includes(search.toLowerCase())
});



  return (
    <div className='home'>
 <section className="hero">
        <div className="hero-content">
          <h1>Power of APIs</h1>
            <p className='text'> Welcome to the API Integration Projects Showcase.  
This page highlights a variety of real-world applications that demonstrate how APIs can enhance your development workflow.  
From fetching weather data to managing user interactions, each project here reflects a practical use case that utilizes API requests and responses.  
Dive into the projects below to explore how RESTful APIs, external services, and real-time data come together in modern web development.
</p>
        </div>
      <div className="search-bar">
        <label htmlFor="search">🔍 Search Projects</label>
        <input id="search" type="text" placeholder="Type to search..." value={search} onChange={(e)=>setsearch(e.target.value)}/>
      </div>
<div className='cards'>
  {searchdata.length > 0 ? (
    searchdata.map((item, index) => (
      <div key={index} className="card">
        <img src={item.image} className="card-img-top" alt={item.name}/>
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">{item.description}</p>
          <Link className="btn btn-primary" to={item.path}>
            <span>Show the project</span>
            <i><FaLongArrowAltRight/></i>
          </Link>
        </div>
      </div>
    ))
  ) : (
    <p style={{ color: "white", textAlign: "center" }}>No projects found</p>
  )}
</div>
      </section>
    </div>
  )
}





export default Home