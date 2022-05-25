import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '/build')));
app.use(express.json());
app.use(express.static("posters"));


const client = new MongoClient('mongodb://localhost:27017');
const upload = multer( {dest: 'posters/'})


//Bonus. Working in Postman, make sure your json data is inputted exactly like a file with [] around it.
app.post('/api/init/:apiKey', async (req, res) => {
    const { apiKey } = req.params;
    const movieData = req.body;
    if (apiKey === "9c147b29-2e60-4c5d-bd65-65c6aa8cb2eb") {
        console.log("Initializing database with JSON data.");
        try{
            await client.connect();
            const db = client.db("movieDatabase");
            await db.collection('movies').deleteMany( {} );
            await db.collection('movies').insertMany( movieData );
            const movieInfo = await db.collection('movies').find({}).toArray();
            res.status(200).json(movieInfo);
            client.close();
        }catch(error){
            res.sendStatus(500);
        }
    }
})

app.get('/posters/:filename', async (req, res) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullPath = path.join(dirname, 'posters/' + filename);
    res.sendFile(fullPath);
});

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
});

app.post('/api/add', upload.single('movie_poster'), async (req, res) => {
    const movieName = req.body.movie_name;
    const releaseDate = req.body.release_date;
    const actors = req.body.actors;
    const rating = req.body.movie_rating;
    const poster = req.file;

    try{
        await client.connect();
        const db = client.db("movieDatabase");
        await db.collection('movies').insertOne( {
            "name": movieName,
            "releaseDate": releaseDate,
            "actors": actors.trim().replace("\n", "").split(",").filter( (actor) => actor.trim() !== "").map(actor => actor.trim()),
            "poster": poster.filename,
            "rating": parseInt(rating)
        });
        const movieInfo = await db.collection('movies').find({}).toArray();
        res.status(200).json(movieInfo);
        client.close();
    }catch(error){
        res.sendStatus(500);
    }
});

app.post('/api/remove', async (req, res) => {
    const id = req.body.id;

    try{
        await client.connect();
        const db = client.db("movieDatabase");
        await db.collection('movies').deleteOne( {
            "_id": ObjectId(id)
        });
        const movieInfo = await db.collection('movies').find({}).toArray();
        res.status(200).json(movieInfo);
        client.close();
    }catch(error){
        res.sendStatus(500);
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8000, () => console.log("Listening on port 8000."));