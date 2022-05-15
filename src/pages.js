import React from "react";
import Link from "react-router-dom";

export function MovieReviews( { moviesList = [], onChangeMovies = f => f }) {
    if( moviesList == null || moviesList == undefined ) return <h2></h2>

    return(
        <>
            <h1>Movie Reviews</h1>
            {console.log(moviesList)}
            {
            moviesList.map ( (movie) => {
                return(
                <>
                    <h2>{movie.name}</h2>
                    <img src={movie.poster} />
                    <h4>Release date: {movie.releaseDate}</h4>
                    <h4>Starring:</h4>
                    <ul>
                        {movie.actors.map( (actor) => {
                            return <li>{actor}</li>
                        })}
                    </ul>
                    <h4>Rating: {movie.rating}</h4>
                </>)
            })
           }
        </>
    );
}

export function SubmitReview() {
    return(
        <div>
            <h1>Submit a Movie Review</h1>
            <form>
                <label for="movie_name">Movie Title: </label>
                <input type="text" id="movie_name" name="movie_name "/>
            </form>
        </div>
    );
}