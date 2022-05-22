import React, { useRef } from "react";
import './form.css';

const $ = selector => document.querySelector(selector);

export function SubmitReview( {onAddMovie = f => f} ) {
    const addMovie = async () => {
        const result = await fetch(`/api/data/add_movie`, {
            method: "post",
            body: JSON.stringify( {} ),
            headers: {
                'Content-Type': 'application/json',
            }
        }) 
        const body = await result.json();
    }


    const movieNameRef = useRef();
    const releaseDateRef = useRef();
    const actorsRef = useRef();
    const ratingRef = useRef();
    const posterRef = useRef();

    const submit = e => {
        const validExtensions = ["jpg", "jpeg", "png", "bmp"];
        

        e.preventDefault();
        const movieName = movieNameRef.current.value;
        const releaseDate = releaseDateRef.current.value;
        const actors = actorsRef.current.value;
        const rating = parseInt(ratingRef.current.value);
        const poster = posterRef.current.value;
        let fileExtension = poster.split('.').pop();

        if (movieName !== "" && releaseDate !== "" && actors.match(/[A-Za-z]/) && validExtensions.includes(fileExtension)){
            onAddMovie(movieName, releaseDate, actors, rating, poster);
            document.querySelector("#confirmation").classList = "success";
            document.querySelector("form").nextElementSibling.textContent = `${movieName} review submission successful!`;
            movieNameRef.current.value = "";
            releaseDateRef.current.value = "";
            actorsRef.current.value = "";
        }else if(!(validExtensions.includes(fileExtension))){
            $("#confirmation").classList = "fail";
            $("#confirmation").textContent = "Invalid image file.";
        }else{
            $("#confirmation").classList = "fail";
            $("#confirmation").textContent = "All text fields must be completed.";
        };
    };

    return(
        <div>
            <h1>Submit a Movie Review</h1>
            <form method="post" encType="multipart/form" onSubmit={submit}>
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
                <label htmlFor="movie_poster">Movie poster: </label>
                <input type="file" ref={posterRef} id="movie_poster" name="movie_poster" accept=".bmp, .png, .jpg, .jpeg" /><br/>
                <button id="submit_review" type="submit">Submit Review</button>
            </form>
            <span id="confirmation"></span>
        </div>
    );
};