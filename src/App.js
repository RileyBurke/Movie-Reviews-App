import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import { MovieReviews, SubmitReview } from "./pages";
import { Navigation } from "./navigation";

function App() {
  const [movies, setMovies] = useState(null);

  useEffect( () => {
    fetch("./movies.json")
    .then( response => response.json() )
    .then( setMovies )
    .then( console.log(movies) )
    .catch( e => console.log(e.message));
  }, []);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<MovieReviews moviesList={movies} setMovies={setMovies} />} />
        <Route path="/submit" element={<SubmitReview />} />
      </Routes>
    </>
  );
}

export default App;
