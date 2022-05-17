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
        <Route path="/" element={<MovieReviews moviesList={movies} setMovies={setMovies} 
        onRemoveMovie={id => {
          const newList = movies.filter(id => movies.id !== id);
          console.log(movies.id);
          console.log(newList);
          console.log(id);
          setMovies(newList);
        }} />} />
        <Route path="/submit" element={<SubmitReview />} />
      </Routes>
    </>
  );
}

export default App;
