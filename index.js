const express = require('express');
const cors = require('cors');
const { Connection } = require('./src/Config/db');
const { yogaRouter } = require('./src/Routes/YogaForHappiness.routes');
const { tripsRouter } = require('./src/Routes/Trips.routes');
const { secretRouter } = require('./src/Routes/SecretsOfSuccess.routes');
const { galleryRouter } = require('./src/Routes/Gallery.routes');
const { festivalRouter } = require('./src/Routes/Festivals.routes');
const { blogsRouter } = require('./src/Routes/Blogs.routes');
const { artRouter } = require('./src/Routes/ArtOfMind.routes');
const { userRouter } = require('./src/Routes/User.routes');
const app = express();

const corsOptions = {
    origin: "http://localhost:3000", 
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true, 
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions)); 
app.use(express.json());

app.use("/api/yoga", yogaRouter);
app.use("/api/trips", tripsRouter);
app.use("/api/secrets", secretRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/festival", festivalRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/arts", artRouter);
app.use("/api/users", userRouter);

app.listen(2346,()=>{
    try {
        Connection()
        console.log('listening on port 2346');
    } catch (error) {
        console.log(error.message)
    }
})