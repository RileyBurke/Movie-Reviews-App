import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import { MovieReviews, SubmitReview } from "./pages";



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
    <div>
      <Routes>
        <Route path="/" element={<MovieReviews moviesList={movies} setMovies={setMovies} />} />
        <Route path="/submit" element={<SubmitReview />} />
      </Routes>
    </div>
  );
}

export default App;
