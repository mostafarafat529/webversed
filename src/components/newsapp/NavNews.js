import "./news.css";

const NavNews = ({ categories, activeCat, setcat }) => {
  return (
    <nav className="categories" aria-label="News categories">
      <ul>
        {categories.map((c) => (
          <li key={c}>
            <button
              type="button"
              className={`cat-btn${activeCat === c ? " active" : ""}`}
              aria-pressed={activeCat === c}
              onClick={() => setcat(c)}
            >
              {c}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavNews;