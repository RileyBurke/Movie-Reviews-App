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

  // useEffect( () => {
  //   fetch("movies.json")
  //   .then( response => response.json() )
  //   .then( setMovies )
  //   .then( console.log(movies) )
  //   .catch( e => console.log(e.message));
  // }, []);

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<ReviewsPage moviesList={movies} 
        onRemoveMovie={id => {
          const newList = movies.filter(movies => movies._id !== id);
          setMovies(newList);

          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify({
          "id": id
          });

          var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
          };

          fetch("http://localhost:8000/api/remove", requestOptions)
          .then(response => response.json())
          .then(setMovies)
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

        }} />} />
        <Route path="/add" element={<AddMoviePage
        onAddMovie={ (requestOptions) => {

          fetch("http://localhost:8000/api/add", requestOptions)
            .then(response => response.json())
            .then(setMovies)
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }}/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;