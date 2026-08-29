import { Link, useLocation } from "react-router-dom";
import { FaHome, FaLongArrowAltLeft } from "react-icons/fa";
import "./navbar.css";

const TITLES = {
  "/": "Playground",
  "/generateimg": "AI Image Generator",
  "/currency": "Currency Converter",
  "/jokes": "Random Jokes",
  "/location": "Location Finder",
  "/news": "News App",
  "/prayertimes": "Prayer Times",
  "/quotes": "Inspirational Quotes",
  "/textspeech": "Text to Speech",
  "/uploadimg": "Image Upload",
  "/weather": "Weather App",
};

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <header className="navbar-web">
      <div className="navbar-inner">
        <Link className="navbar-brand" to="/">
          <span className="brand-mark">W</span>
          <span className="brand-text">
            Web<span className="brand-accent">verse</span>
          </span>
        </Link>

        <nav className="navbar-title">
          {TITLES[pathname] || "Playground"}
        </nav>

        {pathname !== "/" && (
          <Link className="navbar-back" to="/">
            <FaLongArrowAltLeft />
            <FaHome />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;
