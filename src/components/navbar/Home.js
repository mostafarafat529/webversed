import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaLongArrowAltRight } from "react-icons/fa";
import {
  FaArrowRightArrowLeft,
  FaFaceLaughSquint,
  FaLocationDot,
  FaNewspaper,
  FaWandMagicSparkles,
  FaHandsPraying,
  FaQuoteLeft,
  FaVolumeHigh,
  FaImage,
  FaCloudSun,
  FaMagnifyingGlass,
  FaLayerGroup,
  FaLaptopCode,
  FaServer,
  FaDatabase,
  FaArrowRight,
  FaShieldHalved,
  FaBookOpen,
  FaBolt,
  FaCircleInfo,
} from "react-icons/fa6";
import "./home.css";

const projectsData = [
  {
    name: "Currency Converter",
    icon: <FaArrowRightArrowLeft />,
    description: "Convert between multiple currencies with live exchange rates.",
    category: "finance",
    path: "/currency",
  },
  {
    name: "Random Jokes",
    icon: <FaFaceLaughSquint />,
    description: "Get a dose of laughter with random jokes from an API.",
    category: "fun",
    path: "/jokes",
  },
  {
    name: "Location Finder",
    icon: <FaLocationDot />,
    description: "Find location details and coordinates via reverse geocoding.",
    category: "maps",
    path: "/location",
  },
  {
    name: "News App",
    icon: <FaNewspaper />,
    description: "Get the latest news from multiple categories and sources.",
    category: "news",
    path: "/news",
  },
  {
    name: "AI Image Generator",
    icon: <FaWandMagicSparkles />,
    description: "Generate images using AI prompts with full customization options.",
    category: "ai",
    path: "/generateimg",
  },
  {
    name: "Prayer Times",
    icon: <FaHandsPraying />,
    description: "Get accurate daily prayer times based on your location.",
    category: "lifestyle",
    path: "/prayertimes",
  },
  {
    name: "Inspirational Quotes",
    icon: <FaQuoteLeft />,
    description: "Read motivational quotes to start your day right.",
    category: "fun",
    path: "/quotes",
  },
  {
    name: "Text to Speech",
    icon: <FaVolumeHigh />,
    description: "Convert written text into spoken words easily.",
    category: "ai",
    path: "/textspeech",
  },
  {
    name: "Image Upload",
    icon: <FaImage />,
    description: "Upload images and preview them instantly.",
    category: "utility",
    path: "/uploadimg",
  },
  {
    name: "Weather App",
    icon: <FaCloudSun />,
    description: "Check the current weather and forecasts for any city.",
    category: "weather",
    path: "/weather",
  },
];

const categories = [
  { key: "all", label: "All", icon: <FaLayerGroup /> },
  { key: "ai", label: "AI & Creative", icon: <FaWandMagicSparkles /> },
  { key: "news", label: "News & Content", icon: <FaNewspaper /> },
  { key: "weather", label: "Weather & Data", icon: <FaCloudSun /> },
  { key: "finance", label: "Finance & Conversions", icon: <FaArrowRightArrowLeft /> },
  { key: "maps", label: "Maps & Geocoding", icon: <FaLocationDot /> },
  { key: "fun", label: "Entertainment", icon: <FaFaceLaughSquint /> },
  { key: "lifestyle", label: "Lifestyle & Faith", icon: <FaHandsPraying /> },
  { key: "utility", label: "Utility & Media", icon: <FaImage /> },
];

const stats = [
  { value: projectsData.length, label: "Interactive Tools" },
  { value: categories.length - 1, label: "Tool Categories" },
  { value: 9, label: "Live API Integrations" },
  { value: 100, label: "% Client-side, Free to Use" },
];

const apiFlow = [
  { icon: <FaLaptopCode />, kind: "Your App", label: "sends a request" },
  { icon: <FaServer />, kind: "The API", label: "processes & finds data" },
  { icon: <FaDatabase />, kind: "Live Data", label: "returned to you" },
];

const steps = [
  {
    icon: <FaBookOpen />,
    title: "Browse the collection",
    text: "Pick one of the ten tools from the grid or use the search bar to jump straight to what you need.",
  },
  {
    icon: <FaMagnifyingGlass />,
    title: "Request live data",
    text: "Each tool talks to a real public API in the background — no mock data, no static demo results.",
  },
  {
    icon: <FaServer />,
    title: "APIs do the heavy lifting",
    text: "Weather, news, currency, maps, jokes, quotes and AI models respond with fresh data in real time.",
  },
  {
    icon: <FaShieldHalved />,
    title: "You stay in control",
    text: "Keys are stored in the environment. Learn how to keep your own keys safe in the security section below.",
  },
];

const insights = [
  { tool: "Weather App", api: "weatherapi.com", auth: "key" },
  { tool: "News App", api: "newsapi.org", auth: "key" },
  { tool: "Location Finder", api: "opencagedata.com", auth: "key" },
  { tool: "AI Image Generator", api: "openai.com", auth: "key" },
  { tool: "Image Upload", api: "cloudinary.com", auth: "key" },
  { tool: "Currency Converter", api: "frankfurter.dev", auth: "nokey" },
  { tool: "Random Jokes", api: "jokeapi.dev", auth: "nokey" },
  { tool: "Inspirational Quotes", api: "animechan.io", auth: "nokey" },
  { tool: "Prayer Times", api: "aladhan.com", auth: "nokey" },
];

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = projectsData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.description.toLowerCase().includes(search.trim().toLowerCase()) ||
      item.category.toLowerCase().includes(search.trim().toLowerCase());
    const matchesCategory = category === "all" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="home">
      <section className="hero">
        {/* -------------------- Hero -------------------- */}
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="hero-badge">
            <FaBolt /> API & Web Tools Playground
          </span>
          <h1>
            Power of <span className="accent">APIs</span>
          </h1>
          <p className="hero-subtitle">
            Ten real tools, all powered by live public APIs.
          </p>
          <p className="text">
            Welcome to the API Integration Projects Showcase. Every tool on this
            page talks to a real endpoint — from live weather to AI-generated
            images — so you can explore how RESTful APIs, external services, and
            real-time data come together in modern web development.
          </p>

          <div className="search-bar">
            <label htmlFor="search" id="search-label">
              <FaMagnifyingGlass /> Search projects
            </label>
            <div className="search-wrap">
              <FaMagnifyingGlass className="search-icon" aria-hidden="true" />
              <input
                id="search"
                type="text"
                placeholder='Try "weather", "news", "currency", "quote", "AI image"...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-labelledby="search-label"
              />
            </div>
          </div>
        </motion.div>

        {/* -------------------- Category filter -------------------- */}
        <motion.div
          className="category-filter"
          role="group"
          aria-label="Filter tools by category"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              className={`chip${category === cat.key ? " active" : ""}`}
              onClick={() => setCategory(cat.key)}
              aria-pressed={category === cat.key}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* -------------------- Tool cards -------------------- */}
        <motion.div
          className="cards"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.length > 0 ? (
              filtered.map((item, index) => (
                <motion.article
                  key={item.path}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: "easeOut",
                  }}
                  className="tool-card"
                >
                  <div className="tool-card-header">
                    <div className="card-icon">{item.icon}</div>
                    <span className="card-cat">
                      {
                        categories.find((c) => c.key === item.category)
                          ?.label
                      }
                    </span>
                  </div>
                  <h3 className="card-title">{item.name}</h3>
                  <p className="card-text">{item.description}</p>
                  <Link className="card-btn" to={item.path}>
                    <span>Show the project</span>
                    <i aria-hidden="true">
                      <FaLongArrowAltRight />
                    </i>
                  </Link>
                </motion.article>
              ))
            ) : (
              <motion.div
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FaMagnifyingGlass className="empty-icon" aria-hidden="true" />
                <h3>No projects found</h3>
                <p>Try a different keyword like "weather" or "news".</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* -------------------- Stats -------------------- */}
        <section className="section" aria-label="Webverse at a glance">
          <div className="stats-section">
            {stats.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-number">
                  {s.value}
                  {s.label.startsWith("%") ? "%" : ""}
                </div>
                <div className="stat-label">{s.label.replace(/^% /, "")}</div>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------- What is an API -------------------- */}
        <section className="section">
          <div className="section-head">
            <h2>What is an API?</h2>
            <p>
              An <strong>Application Programming Interface</strong> (API) is a
              set of rules that lets one piece of software talk to another. When
              you open a tool on this page, your browser sends a request to a
              remote server and receives structured data back — usually JSON.
            </p>
          </div>
          <div className="api-flow" role="list">
            {apiFlow.map((step, i) => (
              <div key={i} style={{ display: "contents" }}>
                <div className="api-flow-step" role="listitem">
                  <div className="flow-icon">{step.icon}</div>
                  <p>{step.label}</p>
                  <p className="step-kind">{step.kind}</p>
                </div>
                {i < apiFlow.length - 1 && (
                  <div className="flow-arrow" aria-hidden="true">
                    <FaArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* -------------------- How Webverse Works -------------------- */}
        <section className="section">
          <div className="section-head">
            <h2>How Webverse Works</h2>
            <p>
              No backend is required. Every request is made directly from your
              browser to a public API using your own keys, so the experience is
              fast, transparent, and free.
            </p>
          </div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div className="step-card" key={s.title}>
                <div className="step-num">{i + 1}</div>
                <div className="step-icon">{s.icon}</div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* -------------------- API Insights -------------------- */}
        <section className="section" aria-labelledby="insights-title">
          <div className="section-head">
            <h2 id="insights-title">API Insights</h2>
            <p>
              A transparent look at which third-party APIs power each tool and
              whether they need an authentication key.
            </p>
          </div>
          <div className="insights-grid">
            {insights.map((ins) => (
              <div className="insight-card" key={ins.tool}>
                <h4>
                  <FaCircleInfo aria-hidden="true" />
                  {ins.tool}
                </h4>
                <div className="insight-row">
                  <span className="k">Endpoint</span>
                  <span className="v">{ins.api}</span>
                </div>
                <div className="insight-row">
                  <span className="k">Auth needed</span>
                  <span className={`auth-badge ${ins.auth}`}>
                    {ins.auth === "key" ? "API key" : "No key"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* -------------------- Security education -------------------- */}
        <section className="section" aria-labelledby="security-title">
          <div className="section-head">
            <h2 id="security-title">API Key Security</h2>
          </div>
          <div className="security-note">
            <h3>
              <FaShieldHalved aria-hidden="true" />
              Keep your keys safe
            </h3>
            <ul>
              <li>
                <strong>Never hardcode keys.</strong> This project stores them
                in a local <code>.env</code> file excluded from version control.
              </li>
              <li>
                <strong>Understand what's exposed.</strong> In Create React App,
                anything prefixed <code>REACT_APP_</code> is embedded in the
                browser bundle — anyone can read it. Use
                <code>&nbsp;REACT_APP_</code> vars only for client-safe keys
                (like free weather access), and keep production secrets on a
                backend instead.
              </li>
              <li>
                <strong>Restrict usage.</strong> Set domain limits and usage
                caps in each provider's dashboard so stolen keys are less
                valuable.
              </li>
              <li>
                <strong>Rotate often.</strong> Regenerate a key the moment it
                leaks or you stop using it.
              </li>
            </ul>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Home;