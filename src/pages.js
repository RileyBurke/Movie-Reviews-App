import React, { useRef } from "react";
import { FaTrash } from "react-icons/fa";


export function Review({id, name, actors, poster, releaseDate, rating, onRemove = f => f}) {
    return(
        <div>
            <h2>{name}</h2>
            <button onClick={() => onRemove(id)}>
            <FaTrash />
            </button><br/>
            <img src={poster} />
            <h4>Release date: {releaseDate}</h4>
            <h4>Starring:</h4>
            <ul>
                {actors.map( (actors) => {
                    return <li key={actors.id}>{actors.actor}</li>
                })}
            </ul>
            <h4>Rating: {rating}</h4>
        </div>);
}

export function MovieReviews( { moviesList = [], onRemoveMovie = f => f }) {

    if( moviesList == null || moviesList == undefined || !moviesList.length) return <h2>No reviews listed.</h2>
    let moviesListObjects = moviesList.map( (movie) => ({movieInfo: movie, onRemove:{onRemoveMovie}}))
    return(
        <>
            <h1>Movie Reviews</h1>
            {console.log(moviesListObjects)}
            {
            moviesListObjects.map ( (movie) => {
                let actorsObject = movie.movieInfo.actors.map( (actor, i) => ({actor: actor, id: i}));
                return(
                    <Review id={movie.movieInfo.id} name={movie.movieInfo.name} actors={actorsObject} poster={movie.movieInfo.poster} releaseDate={movie.movieInfo.releaseDate} 
                    rating={movie.movieInfo.rating} onRemove={onRemoveMovie} key={movie.movieInfo.id} />
                );}
            )
        }
        </>
    )
};




export function SubmitReview( {onAddMovie = f => f} ) {
    const movieNameRef = useRef();
    const releaseDateRef = useRef();
    const actorsRef = useRef();
    const ratingRef = useRef();
    const posterRef = useRef();

    const submit = e => {
        e.preventDefault();
        const movieName = movieNameRef.current.value;
        const releaseDate = releaseDateRef.current.value;
        const actors = actorsRef.current.value;
        const rating = ratingRef.current.value;
        const poster = posterRef.current.value;

        if (movieName !== "" && releaseDate !== "" && actors !== ""){
            onAddMovie(movieName, releaseDate, actors, rating, poster);
        }
    }


    return(
        <div>
            <h1>Submit a Movie Review</h1>
            <form onSubmit={submit}>
                <label htmlFor="movie_name">Movie Title: </label>
                <input ref={movieNameRef} type="text" id="movie_name" name="movie_name" required/><br/>
                <label htmlFor="release_date">Release date: </label>
                <input ref={releaseDateRef} type="text" id="release_date" name="release_date" required/><br/>
                <label htmlFor="actors">Actors: </label>
                <textarea ref={actorsRef} id="actors" name="actors" placeholder="Actor1, actor2, actor3, etc." required/><br/>
                <label htmlFor="movie_rating">Movie rating: </label>
                <select ref={ratingRef} id="movie_rating" name="movie_rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br/>
                <label  htmlFor="movie_poster">Select placeholder image: </label>
                <select ref={posterRef} id="movie_poster" name="movie_poster">
                    <option value="/movie_posters/Alien.jpg">Alien</option>
                    <option value="/movie_posters/Blade_Runner.png">Blade Runner</option>
                    <option value="/movie_posters/Full_Metal_Jacket.jpg">Full Metal Jacket</option>
                    <option value="/movie_posters/StarWars.jpg">Star Wars</option>
                    <option value="/movie_posters/No_Country_for_Old_Men.jpg">No Country for Old Men</option>
                </select><br/>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    );
}