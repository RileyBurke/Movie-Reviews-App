import React, { useState } from "react";
import './../form.css';

const $ = selector => document.querySelector(selector);

function AddMoviePage( {onAddMovie = f => f} ) {
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


    const [movieName, setMovieName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [actors, setActors] = useState("");
    const [rating, setRating] = useState(1);
    const [poster, setPoster] = useState(null);

    const submit = e => {
        const validExtensions = ["jpg", "jpeg", "png", "bmp"];
        
        e.preventDefault();
        let fileExtension = poster.split('.').pop();

        if (movieName !== "" && releaseDate !== "" && actors.match(/[A-Za-z]/) && validExtensions.includes(fileExtension)){
            onAddMovie(movieName, releaseDate, actors, rating, poster);
            document.querySelector("#confirmation").classList = "success";
            document.querySelector("form").nextElementSibling.textContent = `${movieName} review submission successful!`;
            
            // var formdata = new FormData();
            // formdata.append("name", movieName);
            // formdata.append("releaseDate", releaseDate);
            // formdata.append("actors", actors.trim().replace("\n", "").split(",").filter( (actor) => actor.trim() !== "").map(actor => actor.trim()));
            // formdata.append("poster", $("#movie_poster").files[0]);
            // formdata.append("rating", parseInt(rating));

            // var requestOptions = {
            // method: 'POST',
            // body: formdata,
            // redirect: 'follow'
            // };
            
            // fetch("http://localhost:8000/add/submit", requestOptions)
            // .then(response => response.text())
            // .then(result => console.log(result))
            // .catch(error => console.log('error', error));

            $("#movie_form").submit();
            setMovieName("");
            setReleaseDate("");
            setActors("");
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
            <form action="/add/submit" id="movie_form" method="POST" encType="multipart/form-data" onSubmit={submit}>
                <label htmlFor="movie_name">Movie Title: </label>
                <input type="text" id="movie_name" name="movie_name" onChange={e => setMovieName(e.target.value)}/><br/>
                <label htmlFor="release_date">Release date: </label>
                <input type="text" id="release_date" name="release_date" onChange={e => setReleaseDate(e.target.value)} /><br/>
                <label htmlFor="actors">Actors: </label>
                <textarea id="actors" name="actors" placeholder="Actor1, actor2, actor3, etc." cols="40" rows="5" onChange={e => setActors(e.target.value)} /><br/>
                <label htmlFor="movie_rating">Movie rating: </label>
                <select id="movie_rating" name="movie_rating" onChange={e => setRating(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select><br/>
                <label htmlFor="movie_poster">Movie poster: </label>
                <input type="file" id="movie_poster" name="movie_poster" accept=".bmp, .png, .jpg, .jpeg" onChange={e => setPoster(e.target.value)}/><br/>
                <button id="submit_review" type="submit">Submit Review</button>
            </form>
            <span id="confirmation"></span>
        </div>
    );
};

export default AddMoviePage;