import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap"
import Alerts from "../components/Alerts";

const $ = selector => document.querySelector(selector);


function AddMoviePage({onAddMovie = f => f}) {
    const [movieName, setMovieName] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [actors, setActors] = useState("");
    const [rating, setRating] = useState(1);
    const [poster, setPoster] = useState("");
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [show, setShow] = useState(false);

    const submit = e => {
        const validExtensions = ["jpg", "jpeg", "png", "bmp"];
        e.preventDefault();
        let fileExtension = poster.split('.').pop();

        if (movieName !== "" && releaseDate !== "" && actors.match(/[A-Za-z]/) && validExtensions.includes(fileExtension)){
            setShow(true);
            setSuccess(true);
            setMessage(`${movieName} review submission successful!`);
            
            var formdata = new FormData();
            formdata.append("movie_name", movieName);
            formdata.append("release_date", releaseDate);
            formdata.append("actors", actors);
            formdata.append("movie_poster", $("#movie_poster").files[0]);
            formdata.append("movie_rating", rating);

            var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
            };

            onAddMovie(requestOptions);

            setMovieName("");
            setReleaseDate("");
            setActors("");
            setRating(1);
            setPoster("");
            $("#movie_name").value = "";
            $("#release_date").value = "";
            $("#actors").value = "";
            $("#movie_rating").value = 1;
            $("#movie_poster").value = "";

        }else if(!(validExtensions.includes(fileExtension))){
            setShow(true);
            setSuccess(false);
            setMessage("Invalid image file.");
        }else{
            setShow(true);
            setSuccess(false);
            setMessage("All text fields must be completed.");
        };
    };

    return(
        <>
        <h1>Submit a Movie Review</h1>
        <Container>
            <Form action="/add/submit" id="movie_form" method="POST" encType="multipart/form-data" onSubmit={submit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="movie_name">Movie Title: </Form.Label>
                    <Form.Control type="text" id="movie_name" name="movie_name" onChange={e => setMovieName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="release_date">Release date: </Form.Label>
                    <Form.Control type="text" id="release_date" name="release_date" onChange={e => setReleaseDate(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="actors">Actors: </Form.Label>
                    <Form.Control as="textarea" id="actors" name="actors" placeholder="Actor1, actor2, actor3, etc." rows="5" onChange={e => setActors(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label htmlFor="movie_rating">Movie rating: </Form.Label>
                <Form.Select id="movie_rating" name="movie_rating" onChange={e => setRating(e.target.value)}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Label htmlFor="movie_poster">Movie poster: </Form.Label>
                    <Form.Control type="file" id="movie_poster" name="movie_poster" accept=".bmp, .png, .jpg, .jpeg" onChange={e => setPoster(e.target.value)}/>
                    <Form.Text muted>Only images of type .jpg, .png, .bmp accepted.</Form.Text>
                </Form.Group>
                <Form.Group className="mb-4">
                    <Button variant="outline-success" size="lg" id="submit_review" type="submit">Submit Review</Button>
                </Form.Group>
            </Form>
            <Alerts show={show} success={success} message={message} setShow={setShow}/>
        </Container>
        </>
    );
};

export default AddMoviePage;