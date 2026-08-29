import { useCallback, useEffect, useState } from "react";
import NavNews from "./NavNews";
import ApiDetails from "../apiDetails/apiDetails";
import { API_DETAILS } from "../apiDetails/apiDetailsData";
import {
  getNews,
  getDefaultProvider,
  getProviderInfo,
  NEWS_PROVIDERS,
} from "./newsService";
import {
  FaLocationArrow,
  FaRotateLeft,
  FaLink,
  FaClock,
  FaTag,
  FaCircleInfo,
  FaTriangleExclamation,
} from "react-icons/fa6";
import "./news.css";

const PLACEHOLDER_IMG =
  "https://cdn.pixabay.com/photo/2017/06/26/19/03/news-2444778_1280.jpg";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const formatDate = (iso) => {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

const Newsapp = () => {
  const [news, setNews] = useState([]);
  const [cat, setCat] = useState("general");
  const [provider, setProvider] = useState(getDefaultProvider);
  const [open, setOpen] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(
    async (category, providerId) => {
      setLoading(true);
      setError("");
      setOpen(null);
      try {
        const items = await getNews(category, providerId);
        setNews(items);
      } catch (err) {
        setNews([]);
        setError(err?.message || "Something went wrong while loading the news.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    load(cat, provider);
  }, [cat, provider, load]);

  const providerInfo = getProviderInfo(provider);

  return (
    <div className="App news-page">
      <NavNews categories={categories} activeCat={cat} setcat={setCat} />

      <div className="news-toolbar">
        <label className="provider-label" htmlFor="news-provider">
          Data source:
        </label>
        <select
          id="news-provider"
          className="provider-select"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        >
          {NEWS_PROVIDERS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
        {providerInfo.needsKey && (
          <span className="provider-hint">
            Requires an API key; call it through a server proxy (no browser CORS).
          </span>
        )}
      </div>

      <div className="contain" aria-live="polite">
        {loading && (
          <div className="state-box">
            <span className="spinner" aria-hidden="true" />
            <p className="hint">Loading the latest {cat} headlines…</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-box error">
            <FaTriangleExclamation className="state-icon" aria-hidden="true" />
            <p className="hint error-text">{error}</p>
            <button
              type="button"
              className="retry-btn"
              onClick={() => load(cat, provider)}
            >
              <FaRotateLeft aria-hidden="true" /> Try again
            </button>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="state-box">
            <FaCircleInfo className="state-icon" aria-hidden="true" />
            <p className="hint">
              No articles found for &ldquo;{cat}&rdquo; today. Try another
              category.
            </p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <ul className="news-list">
            {news.map((item, index) => {
              const isOpen = open === index;
              return (
                <li className="news-item" key={item.id}>
                  <button
                    type="button"
                    className="news-head"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`news-body-${index}`}
                  >
                    <span className="news-title">{item.title}</span>
                    <span className="news-meta">
                      <span className="news-source">@{item.source}</span>
                      {item.publishedAt && (
                        <span className="news-date">{formatDate(item.publishedAt)}</span>
                      )}
                    </span>
                    <FaLocationArrow
                      className={`arrow_news${isOpen ? " open" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {isOpen && (
                    <div
                      className="news-body"
                      id={`news-body-${index}`}
                      role="region"
                      aria-label={item.title}
                    >
                      <div className="news-image">
                        <img
                          src={item.urlToImage || PLACEHOLDER_IMG}
                          alt={item.title}
                          loading="lazy"
                        />
                      </div>
                      <div className="news-info">
                        <div className="news-badges">
                          <span className="news-badge">
                            <FaTag aria-hidden="true" /> {cat}
                          </span>
                          {item.author && (
                            <span className="news-badge news-author">
                              by {item.author}
                            </span>
                          )}
                          {item.extra?.points !== undefined && (
                            <span className="news-badge">
                              {item.extra.points} points ·{" "}
                              {item.extra.comments ?? 0} comments
                            </span>
                          )}
                        </div>
                        <p className="news-desc">
                          {item.description ||
                            "No description provided — open the article to read it."}
                        </p>
                        <div className="news-actions">
                          <a
                            className="news-link"
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Read more <FaLink aria-hidden="true" />
                          </a>
                          {item.publishedAt && (
                            <span className="news-time">
                              <FaClock aria-hidden="true" />{" "}
                              {item.publishedAt
                                ? new Date(item.publishedAt).toLocaleString()
                                : ""}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <ApiDetails meta={API_DETAILS.news} />
    </div>
  );
};

export default Newsapp;