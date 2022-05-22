import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaTrash, FaStar } from "react-icons/fa";
import './reviews.css';

export function Review({id, name, actors, poster, releaseDate, rating, onRemove = f => f}) {
    return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <h2>{name}</h2>
                        <h4>Release date: {releaseDate}</h4>
                        <h4>Starring:</h4>
                        <ul>
                            {actors.map( (actors) => {
                                return <li key={actors.id}>{actors.actor}</li>
                            })}
                        </ul>
                        <h4 className="movieRating">
                            Rating: {StarRating(rating)}
                        </h4>
                        <button onClick={() => onRemove(id)}>
                        <FaTrash />
                        </button>
                    </Col>
                    <Col>
                        <img src={poster} alt={`${poster.split(/[/.]/)[2]} movie poster`} />
                    </Col>
                </Row>
            </Container>
        </div>);
}

export function MovieReviews( { moviesList = [], onRemoveMovie = f => f }) {
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

function StarRating(rating) {
    switch (rating){
        case 1:
            return(<FaStar/>);
        case 2:
            return(
                <>
                    <FaStar/><FaStar/>
                </>);
        case 3:
            return(
                <>
                    <FaStar/><FaStar/><FaStar/>
                </>);
        case 4:
            return(
                <>
                    <FaStar/><FaStar/><FaStar/><FaStar/>
                </>);
        case 5:
            return(
                <>
                    <FaStar/><FaStar/><FaStar/><FaStar/><FaStar/>
                </>);
        default:
            return(
                <h4>N/A</h4>
            );
    };
};
