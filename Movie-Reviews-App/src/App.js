import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import ReviewsPage from "./pages/ReviewsPage";
import AddMoviePage from './pages/AddMoviePage';
import NavigationBar from "./components/Navbar";
import ErrorPage from "./pages/ErrorPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

function App() {
  const [movies, setMovies] = useState(null);


   useEffect( () => {
     const fetchData = async () => {
       const result = await fetch("/api/data");
       const body = await result.json();
       setMovies(body);
     }
     fetchData();
   }, [])

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<ReviewsPage moviesList={movies} setMovies={setMovies} 
        onRemoveMovie={id => {
          const newList = movies.filter(movies => movies.id !== id);
          setMovies(newList);
        }} />} />
        <Route path="/add" element={<AddMoviePage
        onAddMovie={ (movieName, releaseDate, actors, rating, poster) => {
          let movieId;
          if (movies.length > 0){
            movieId = movies[movies.length - 1].id + 1;
           }else{
             movieId = 0
           };
          const newMovie = {
            id: movieId,
            name: movieName,
            releaseDate: releaseDate,
            //Ensuring no whitespace errors entered within the actors text input.
            actors: actors.trim().replace("\n", "").split(",").filter( (actor) => actor.trim() !== "").map(actor => actor.trim()), 
            poster: poster,
            rating: parseInt(rating)
          };
          console.log(newMovie);
          movies[movies.length] = newMovie;
          setMovies(movies);
        }}/>} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;