import { useState } from "react";

const DEFAULT_URL = "https://";

export default function App() {
  const [url, setUrl] = useState(DEFAULT_URL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setResult(null);

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`/api/page?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Request failed.");
        return;
      }

      setResult(data);
    } catch (err) {
      setError("Unable to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <main className="card">
        <h1>Page Data Viewer</h1>
        <p className="subtitle">Enter a URL and preview basic page data.</p>

        <form onSubmit={handleSubmit} className="form">
          <label htmlFor="url-input">Target URL</label>
          <input
            id="url-input"
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://"
          />
          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Fetch Page"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {result && (
          <section className="result">
            <h2>Title</h2>
            <p>{result.title}</p>
            <h2>Excerpt</h2>
            <p>{result.excerpt}</p>
          </section>
        )}
      </main>
    </div>
  );
}
