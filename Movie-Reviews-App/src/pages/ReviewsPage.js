import React from "react";
import Review from "../components/Review";
import './../reviews.css';


function ReviewsPage( { moviesList = [], onRemoveMovie = f => f }) {
    if( moviesList === null || moviesList === undefined || !moviesList.length) return <h2 id="emptyPage">No reviews listed.</h2>;
    let moviesListObjects = moviesList.map( (movie) => ({movieInfo: movie, onRemove:{onRemoveMovie}}));
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
                        );
                    }
                )
            }
        </>
    );
};

export default ReviewsPage;