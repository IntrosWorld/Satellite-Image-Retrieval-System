"use client";

import { useState } from "react";

const results = [
  { score: "0.912", modality: "SAR", image: "one sar", tags: ["Urban", "Water", "Vegetation"] },
  { score: "0.879", modality: "Optical", image: "two", tags: ["Urban", "Water"] },
  { score: "0.845", modality: "Multispectral", image: "three", tags: ["Urban", "Water", "Vegetation"] },
  { score: "0.823", modality: "SAR", image: "four sar", tags: ["Agriculture", "Water"] },
  { score: "0.801", modality: "Optical", image: "five", tags: ["Urban", "Water", "Agriculture"] },
  { score: "0.781", modality: "Multispectral", image: "one", tags: ["Urban", "Vegetation"] },
  { score: "0.764", modality: "SAR", image: "two sar", tags: ["Water", "Vegetation", "Agriculture"] },
  { score: "0.742", modality: "Optical", image: "three", tags: ["Urban", "Water", "Vegetation"] },
  { score: "0.721", modality: "SAR", image: "four sar", tags: ["Urban", "Water", "Agriculture"] },
  { score: "0.708", modality: "Multispectral", image: "five", tags: ["Agriculture", "Vegetation", "Water"] }
];

const tagClass = {
  Urban: "urban",
  Water: "water",
  Vegetation: "vegetation",
  Agriculture: "agriculture",
  SAR: "sar"
};

function ResultCard({ result, index, loading }) {
  return (
    <article className={`result-card ${loading ? "is-loading" : ""}`}>
      <span className="rank">{index + 1}</span>
      <div className={`thumb ${result.image}`} />
      <div className="result-info">
        <div className="score-line">
          Score: <strong>{result.score}</strong>
        </div>
        <div className="modality-line">
          Modality: <span className={`tag ${tagClass[result.modality] || "vegetation"}`}>{result.modality}</span>
        </div>
        <div className="score-line">Tags:</div>
        <div className="tags">
          {result.tags.map((tag) => (
            <span className={`tag ${tagClass[tag] || ""}`} key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Dashboard() {
  const [loading, setLoading] = useState(false);

  function runRetrieval() {
    setLoading(true);
    window.setTimeout(() => setLoading(false), 700);
  }

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 64 64" role="img">
              <path d="M30 25l9 9-9 9-9-9 9-9z" />
              <path d="M13 16l14 6-8 8-6-14zM47 48l-14-6 8-8 6 14zM48 13l-6 14-8-8 14-6zM16 51l6-14 8 8-14 6z" />
              <circle cx="32" cy="32" r="4" />
            </svg>
          </div>
          <h1>Satellite Image Retrieval System</h1>
        </div>
        <nav className="nav" aria-label="Primary">
          <a href="#" className="nav-link active"><span className="nav-ico home" />Dashboard</a>
          <a href="#" className="nav-link"><span className="nav-ico database" />Database</a>
          <a href="#" className="nav-link"><span className="nav-ico analytics" />Analytics</a>
          <a href="#" className="nav-link"><span className="nav-ico user" />User</a>
        </nav>
      </header>

      <section className="hero-grid" aria-label="Retrieval controls">
        <article className="panel query-panel">
          <div className="section-title">
            <span className="title-icon image-icon" aria-hidden="true" />
            <h2>Query Image</h2>
          </div>
          <div className="query-body">
            <div className="query-image image-tile optical-large" role="img" aria-label="Optical satellite query image">
              <span className="map-chip">Optical Query</span>
            </div>
            <button className="upload-card" type="button">
              <span className="upload-icon" aria-hidden="true" />
              <strong>Upload Image</strong>
              <small>or drag and drop<br />PNG, JPG, TIFF<br />(Max 20MB)</small>
            </button>
          </div>
          <dl className="metadata">
            <div>
              <dt>Modality:</dt>
              <dd><span className="badge green">Optical</span></dd>
            </div>
            <div>
              <dt>Location / Scene ID:</dt>
              <dd>RKL_2024_0456</dd>
            </div>
            <div>
              <dt>Selected Mode:</dt>
              <dd><span className="badge green">Cross-Modal Search</span></dd>
            </div>
          </dl>
        </article>

        <article className="panel sensor-panel">
          <h2>Cross-Sensor Retrieval</h2>
          <div className="sensor-orbit" aria-label="Optical SAR and multispectral retrieval diagram">
            <div className="orbit-ring" />
            <div className="sensor-node optical">
              <span className="node-icon"><span className="sat-mini" /></span>
              <strong>Optical</strong>
            </div>
            <div className="sensor-node sar">
              <span className="node-icon"><span className="radar-mini" /></span>
              <strong>SAR</strong>
            </div>
            <div className="sensor-node multi">
              <span className="node-icon"><span className="grid-mini" /></span>
              <strong>Multispectral</strong>
            </div>
            <div className="database-node">
              <span className="db-stack" />
            </div>
          </div>
        </article>

        <article className="panel settings-panel">
          <div className="section-title">
            <span className="title-icon gear-icon" aria-hidden="true" />
            <h2>Search Settings</h2>
          </div>
          <form className="settings-form">
            <label>
              <span>Query Modality</span>
              <select defaultValue="Optical">
                <option>Optical</option>
                <option>SAR</option>
                <option>Multispectral</option>
              </select>
            </label>
            <label>
              <span>Target Modality</span>
              <select defaultValue="SAR (Synthetic Aperture Radar)">
                <option>SAR (Synthetic Aperture Radar)</option>
                <option>Optical</option>
                <option>Multispectral</option>
                <option>All Modalities</option>
              </select>
            </label>
            <label>
              <span>Top-K Results</span>
              <select defaultValue="10">
                <option>10</option>
                <option>5</option>
                <option>20</option>
              </select>
            </label>
            <label>
              <span>Similarity Mode</span>
              <select defaultValue="Embedding + Topology">
                <option>Embedding + Topology</option>
                <option>Cosine Similarity</option>
                <option>Land-Cover Match</option>
              </select>
            </label>
            <button className="run-button" type="button" onClick={runRetrieval} disabled={loading}>
              <span className="search-icon" aria-hidden="true" />
              {loading ? "Retrieving..." : "Run Retrieval"}
            </button>
          </form>
        </article>
      </section>

      <section className="panel results-panel" aria-label="Top retrieved results">
        <div className="section-title compact">
          <span className="title-icon results-icon" aria-hidden="true" />
          <h2>Top Retrieved Results <span>(Top-10)</span></h2>
        </div>
        <div className="results-grid">
          {results.map((result, index) => (
            <ResultCard result={result} index={index} loading={loading} key={`${result.modality}-${index}`} />
          ))}
        </div>
      </section>

      <section className="panel explanation-panel" aria-label="Retrieval explanation">
        <div className="section-title compact">
          <span className="title-icon explain-icon" aria-hidden="true" />
          <h2>Explanation</h2>
        </div>
        <div className="explain-grid">
          <article className="metric-card">
            <span className="metric-icon network-icon" aria-hidden="true" />
            <div>
              <h3>Embedding Similarity</h3>
              <strong>0.912 / 1.000</strong>
              <p>Higher score means closer semantic match in the embedding space.</p>
            </div>
          </article>
          <article className="metric-card">
            <span className="metric-icon leaf-icon" aria-hidden="true" />
            <div>
              <h3>Land-Cover Match</h3>
              <strong>0.88 / 1.00</strong>
              <p>Good match in land-cover categories.</p>
              <div className="mini-tags">
                <span>Urban</span><span>Water</span><span>Vegetation</span><span>Agriculture</span>
              </div>
            </div>
          </article>
          <article className="metric-card">
            <span className="metric-icon topology-icon" aria-hidden="true" />
            <div>
              <h3>Topology Match</h3>
              <strong>0.86 / 1.00</strong>
              <p>High similarity in spatial layout and structural relationships.</p>
            </div>
          </article>
          <article className="metric-card">
            <span className="metric-icon clock-icon" aria-hidden="true" />
            <div>
              <h3>Retrieval Time</h3>
              <strong>0.842 s</strong>
              <p>Total time taken to retrieve Top-10 results.</p>
            </div>
          </article>
          <article className="layout-card">
            <div className="layout-head">
              <strong>Semantic Layout</strong>
              <span>Query vs Top-1 Result</span>
            </div>
            <div className="layout-preview">
              <div>
                <small>Query Layout</small>
                <div className="semantic-map map-a" />
              </div>
              <div>
                <small>Top-1 Result Layout</small>
                <div className="semantic-map map-b" />
              </div>
              <ul className="legend">
                <li><span className="water" />Water</li>
                <li><span className="urban" />Urban</li>
                <li><span className="veg" />Vegetation</li>
                <li><span className="agri" />Agriculture</li>
                <li><span className="forest" />Forest</li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
