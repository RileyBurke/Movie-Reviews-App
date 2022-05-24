import express from "express";
import { ClientRequest } from "http";
import { MongoClient } from "mongodb";
import path from "path"

const app = express();

app.use(express.json());

const client = new MongoClient('mongodb://localhost:27017');

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

app.post('/add/submit', (req, res) => {
    console.log(req.body);
    const movieName = req.body.name;
    const releaseDate = req.body.releaseDate;
    const actors = req.body.actors;
    const poster = req.body.poster;
    const rating = req.body.rating;
    console.log(movieName);
    console.log(releaseDate);
    console.log(actors);
    console.log(poster);
    console.log(rating);
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