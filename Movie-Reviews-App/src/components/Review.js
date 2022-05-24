import { Container, Row, Col } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import StarRating from "../components/StarRating";

function Review({_id, name, actors, poster, releaseDate, rating, onRemove = f => f}) {
    return(
        <>
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
                        <button onClick={() => onRemove(_id)}>
                        <FaTrash />
                        </button>
                    </Col>
                    <Col>
                        <img src={poster} alt={"Movie poster"} />
                    </Col>
                </Row>
            </Container>
        </>);
}

export default Review;