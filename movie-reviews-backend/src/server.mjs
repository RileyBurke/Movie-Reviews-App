import express from "express";
import { ClientRequest } from "http";
import { MongoClient } from "mongodb";
import multer from "multer";

const app = express();

app.use(express.json());

const client = new MongoClient('mongodb://localhost:27017');

const upload = multer( {dest: 'posters/'})

app.get('/api/data', async (req, res) => {
    try{
        await client.connect();
        const db = client.db("movieDatabase");
        const movieInfo = await db.collection('movies').find({}).toArray();
        res.status(200).json(movieInfo);
        client.close();
    }catch(error){
        res.sendStatus(500);
    }
}) 

app.post('/add/submit', upload.single('movie_poster'), (req, res) => {
    console.log(req.file);
    
    const movieName = req.body.movie_name;
    const releaseDate = req.body.release_date;
    const actors = req.body.actors;
    const rating = req.body.movie_rating;
    
    const poster = req.file;

    // try{
    //     await client.connect();
    //     const db = client.db("movieDatabase");
    //     await db.collection('movies').insertOne( {
    //         "name": movieName,
    //         "releaseDate": releaseDate,
    //         "actors": actors,
    //         "poster": poster,
    //         "rating": parseInt(rating)
    //     });
    //     res.status(200).json(movieInfo);
    //     client.close();
    // }catch(error){
    //     res.sendStatus(500);
    // }
});

app.listen(8000, () => console.log("Listening on port 8000."));