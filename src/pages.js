import React from "react";
import Link from "react-router-dom";

export function MovieReviews( { moviesList = [], onChangeMovies = f => f }) {
    if( moviesList == null || moviesList == undefined ) return <h2></h2>
    let moviesListObjects = moviesList.map( (movie, i) => ({movieInfo: movie, id: i}))
    

    return(
        <>
            <h1>Movie Reviews</h1>
            {console.log(moviesListObjects)}
            {
            moviesListObjects.map ( (movie, i) => {
                let actorsObject = movie.movieInfo.actors.map( (actor, i) => ({actor: actor, id: i}))
                return(
                <div key={i}>
                    <h2>{movie.movieInfo.name}</h2>
                    <img src={movie.movieInfo.poster} />
                    <h4>Release date: {movie.movieInfo.releaseDate}</h4>
                    <h4>Starring:</h4>
                    <ul>
                        {console.log(actorsObject)}
                        {actorsObject.map( (actorsList) => {
                        return <li key={actorsList.id}>{actorsList.actor}</li>
                        })}
                    </ul>
                    <h4>Rating: {movie.movieInfo.rating}</h4>
                </div>)
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