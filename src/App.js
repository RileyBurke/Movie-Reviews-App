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
          const newList = movies.filter(movies => movies.id !== id);
          setMovies(newList);
        }} />} />
        <Route path="/submit" element={<SubmitReview 
        onAddMovie={ (movieName, releaseDate, actors, rating, poster) => {

          const newMovie = {
            id: movies[movies.length - 1].id + 1,
            name: movieName,
            releaseDate: releaseDate,
            actors: actors.split(", "),
            poster: poster,
            rating: rating
          };
          movies[movies.length] = newMovie;
          setMovies(movies);
        }}/>} />
      </Routes>
    </>
  );
}

export default App;