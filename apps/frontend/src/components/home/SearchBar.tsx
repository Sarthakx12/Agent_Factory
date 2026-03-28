export default function SearchBar() {
  return (
    <section style={{
      background: "var(--cream)",
      padding: "64px 0",
      borderBottom: "1px solid var(--cream-border)",
    }}>
      <div className="container">
        <p className="label" style={{ marginBottom: 20 }}>Find your next worker</p>
        <div style={{
          display: "flex",
          gap: 0,
          maxWidth: 640,
          border: "1px solid var(--ink)",
          borderRadius: 2,
          overflow: "hidden",
          background: "var(--cream)",
        }}>
          <input
            type="text"
            placeholder='e.g. "code reviewer", "data analyst", "content writer"'
            style={{
              flex: 1,
              padding: "14px 20px",
              border: "none",
              outline: "none",
              fontSize: 14,
              fontFamily: "var(--font-sans)",
              background: "transparent",
              color: "var(--ink)",
            }}
          />
          <button className="btn btn-primary" style={{ borderRadius: 0, padding: "14px 24px" }}>
            Search
          </button>
        </div>
        <p style={{ marginTop: 14, fontSize: 12, color: "var(--muted-light)" }}>
          Trending: code reviewer · data analyst · content writer · SEO optimizer
        </p>
      </div>
    </section>
  );
}
