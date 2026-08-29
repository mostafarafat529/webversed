// Configurable news provider layer.
//
// Why: newsapi.org does not send CORS headers to browsers on the free plan,
// so a browser-only client cannot reach it directly (it needs a backend proxy).
// We therefore support multiple providers:
//
//   "hn"  - Hacker News (Algolia API): keyless, CORS-enabled, works from the
//           browser today. Categories become search queries.
//   "sfn" - Spaceflight News API: keyless, CORS-enabled, includes images.
//           (Space-focused feed; category acts as a keyword filter.)
//   "newsapi" - newsapi.org: full headlines API. Requires REACT_APP_NEWS_API_KEY
//           AND a server-side proxy for browsers (CORS). If you have a proxy,
//           keep your key there and point this module at it.
//
// Default provider comes from REACT_APP_NEWS_PROVIDER (fallback "hn").

const HN_ENDPOINT = "https://hn.algolia.com/api/v1/search_by_date";
const SFN_ENDPOINT = "https://api.spaceflightnewsapi.net/v4/articles/";
const NEWSAPI_ENDPOINT = "https://newsapi.org/v2/top-headlines";

const hnQueries = {
  general: "news",
  business: "business",
  entertainment: "entertainment",
  health: "health",
  science: "science",
  sports: "sports",
  technology: "technology",
};

const sfnKeywords = {
  general: "",
  business: "",
  entertainment: "",
  health: "",
  science: "science",
  sports: "",
  technology: "launches,rocket",
};

export const NEWS_PROVIDERS = [
  {
    id: "hn",
    label: "Hacker News (keyless)",
    needsKey: false,
    needsProxy: false,
  },
  {
    id: "sfn",
    label: "Spaceflight News (keyless)",
    needsKey: false,
    needsProxy: false,
  },
  {
    id: "newsapi",
    label: "NewsAPI (needs key + proxy)",
    needsKey: true,
    needsProxy: true,
  },
];

export const getDefaultProvider = () => {
  const fromEnv = process.env.REACT_APP_NEWS_PROVIDER || "hn";
  return NEWS_PROVIDERS.some((p) => p.id === fromEnv) ? fromEnv : "hn";
};

const normalizeHn = (hits) =>
  hits
    .filter((h) => h.url)
    .map((h) => ({
      id: String(h.objectID),
      title: h.title || "(untitled)",
      source: "Hacker News",
      author: h.author || null,
      publishedAt: h.created_at,
      url: h.url,
      description: null,
      urlToImage: null,
      extra: {
        points: h.points,
        comments: h.num_comments,
      },
    }));

const normalizeSfn = (results) =>
  results.map((r) => ({
    id: String(r.id),
    title: r.title || "(untitled)",
    source: r.news_site || "Spaceflight News",
    author: r.authors?.[0]?.name || null,
    publishedAt: r.published_at,
    url: r.url,
    description: r.summary || null,
    urlToImage: r.image_url || null,
    extra: null,
  }));

const normalizeNewsApi = (articles) =>
  articles.map((a, i) => ({
    id: String(a.url || i),
    title: a.title || "(untitled)",
    source: a.source?.name || "News API",
    author: a.author || null,
    publishedAt: a.publishedAt,
    url: a.url,
    description: a.description || a.content || null,
    urlToImage: a.urlToImage || null,
    extra: null,
  }));

const fetchHn = async (category) => {
  const query = hnQueries[category] || "news";
  const params = new URLSearchParams({
    query,
    tags: "story",
    hitsPerPage: "15",
  });
  const res = await fetch(`${HN_ENDPOINT}?${params.toString()}`);
  if (!res.ok) throw new Error(`Hacker News API error (${res.status})`);
  const data = await res.json();
  return normalizeHn(data.hits || []);
};

const fetchSfn = async (category) => {
  const params = new URLSearchParams({ limit: "15", ordering: "-published_at" });
  const keywords = (sfnKeywords[category] || "").trim();
  if (keywords) params.set("title_contains_any", keywords);
  const res = await fetch(`${SFN_ENDPOINT}?${params.toString()}`);
  if (!res.ok) throw new Error(`Spaceflight News API error (${res.status})`);
  const data = await res.json();
  return normalizeSfn(data.results || []);
};

const fetchNewsApi = async (category) => {
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  if (!apiKey) {
    throw new Error("Missing REACT_APP_NEWS_API_KEY in your .env file.");
  }
  const country = process.env.REACT_APP_NEWS_COUNTRY || "eg";
  const params = new URLSearchParams({
    country,
    category,
    apiKey,
  });
  // NOTE: newsapi.org blocks browser-only requests (free plan, no CORS).
  // To use this provider, route the request through your own backend/proxy.
  const res = await fetch(`${NEWSAPI_ENDPOINT}?${params.toString()}`);
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(
      body?.message || `News API error (${res.status}).`
    );
  }
  const data = await res.json();
  return normalizeNewsApi(data.articles || []);
};

const fetchers = {
  hn: fetchHn,
  sfn: fetchSfn,
  newsapi: fetchNewsApi,
};

export const getNews = (category, providerId) => {
  const fetcher = fetchers[providerId] || fetchers.hn;
  return fetcher(category);
};

export const getProviderInfo = (providerId) =>
  NEWS_PROVIDERS.find((p) => p.id === providerId) || NEWS_PROVIDERS[0];