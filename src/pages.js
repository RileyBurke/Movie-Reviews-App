import React from "react";

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
            <form id="review_form" action="">
                <label for="movie_name">Movie Title: </label>
                <input type="text" id="movie_name" name="movie_name" /><br/>
                <label for="release_date">Release date: </label>
                <input type="text" id="release_date" name="release_date" /><br/>
                <label for="movie_name">Actors: </label>
                <textarea id="actors" name="actors">Actor1, actor2, actor3, etc.</textarea><br/>
                <label for="movie_rating">Movie rating: </label>
                <select id="movie_rating" name="movie_rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br/>
                <label for="movie_poster">Select placeholder image: </label>
                <select id="movie_poster" name="movie_poster">
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