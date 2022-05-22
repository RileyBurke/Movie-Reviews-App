import express from "express";
import { MongoClient } from "mongodb";

const app = express();

app.use(express.json());

// app.get('/hello', (req, res) => { res.send("hello")});
// app.get('/hello/:name', (req, res) => res.send(`Hello ${req.params.name}`));
// app.post('/hello', (req, res) => { res.send(`hello ${req.body.name}`)});

// app.post('/api/articles/:name/upvote', (req, res) => {
//     const articleName = req.params.name;
//     articlesInfo[articleName.upvotes] += 1;
//     res.status(200).send(`${articleName} now had ${articlesInfo[articleName].upvotes} upvotes!`);
// });

const client = new MongoClient('mongodb://localhost:27017');

app.get('api/data', async (req, res) => {
    try{
        await client.connect();
        const db = client.db("movies");
        const movieInfo = await db.collection('mymovies').find({}).toArray();
        res.status(200).json(movieInfo);
        client.close();
    }catch(error){
        res.sendStatus(500);
    }
    

}) 


app.listen(8000, () => console.log("Listening on port 8000."));