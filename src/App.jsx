import { useState } from "react";

function App() {
  const [movie, setMovie] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [error, setError] = useState("");

  const searchMovie = async () => {
    if (!movie.trim()) {
      setError("Lütfen bir film adı gir.");
      setMovieData(null);
      return;
    }

    setError("");

    // API key buraya gelecek
    const apiKey = "853e8209";
    const url = `https://www.omdbapi.com/?t=${movie}&apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === "False") {
        setError("Film bulunamadı.");
        setMovieData(null);
      } else {
        setMovieData(data);
      }
    } catch (err) {
      setError("Bir hata oluştu.");
      setMovieData(null);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Movie Search App</h1>

      <input
  type="text"
  placeholder="Film adı yaz..."
  value={movie}
  onChange={(e) => setMovie(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") searchMovie();
  }}
  style={{
    padding: "10px",
    fontSize: "16px",
    width: "300px",
    marginRight: "10px",
  }}
/>

      <button
        onClick={searchMovie}
        style={{
          padding: "10px 16px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Ara
      </button>

      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}

      {movieData && (
        <div style={{ marginTop: "30px" }}>
          <h2>{movieData.Title}</h2>
          <img src={movieData.Poster} alt={movieData.Title} width="200" />
          <p><b>Yıl:</b> {movieData.Year}</p>
          <p><b>Tür:</b> {movieData.Genre}</p>
          <p><b>IMDb:</b> {movieData.imdbRating}</p>
          <p><b>Konu:</b> {movieData.Plot}</p>
        </div>
      )}
    </div>
  );
}

export default App;