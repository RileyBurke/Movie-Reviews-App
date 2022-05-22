import React, { useRef } from "react";
import './form.css';


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
        const rating = parseInt(ratingRef.current.value);
        const poster = posterRef.current.value;

        if (movieName !== "" && releaseDate !== "" && actors.match(/[A-Za-z]/)){
            onAddMovie(movieName, releaseDate, actors, rating, poster);
            document.querySelector("#confirmation").classList = "success";
            document.querySelector("form").nextElementSibling.textContent = `${movieName} review submission successful!`;
            movieNameRef.current.value = "";
            releaseDateRef.current.value = "";
            actorsRef.current.value = "";
        }else{
            document.querySelector("#confirmation").classList = "fail";
            document.querySelector("#confirmation").textContent = "All text fields must be completed.";
        };
    };

    return(
        <div>
            <h1>Submit a Movie Review</h1>
            <form onSubmit={submit}>
                <label htmlFor="movie_name">Movie Title: </label>
                <input ref={movieNameRef} type="text" id="movie_name" name="movie_name"/><br/>
                <label htmlFor="release_date">Release date: </label>
                <input ref={releaseDateRef} type="text" id="release_date" name="release_date"/><br/>
                <label htmlFor="actors">Actors: </label>
                <textarea ref={actorsRef} id="actors" name="actors" placeholder="Actor1, actor2, actor3, etc." cols="40" rows="5"/><br/>
                <label htmlFor="movie_rating">Movie rating: </label>
                <select ref={ratingRef} id="movie_rating" name="movie_rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select><br/>
                <label  htmlFor="movie_poster">Placeholder image: </label>
                <select ref={posterRef} id="movie_poster" name="movie_poster">
                    <option value="/movie_posters/Alien.jpg">Alien</option>
                    <option value="/movie_posters/Blade_Runner.png">Blade Runner</option>
                    <option value="/movie_posters/Full_Metal_Jacket.jpg">Full Metal Jacket</option>
                    <option value="/movie_posters/StarWars.jpg">Star Wars</option>
                    <option value="/movie_posters/No_Country_for_Old_Men.jpg">No Country for Old Men</option>
                </select><br/>
                <button id="submit_review" type="submit">Submit Review</button>
            </form>
            <span id="confirmation"></span>
        </div>
    );
};