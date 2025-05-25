const express = require('express');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { Connection } = require('./src/Config/db');
const { yogaRouter } = require('./src/Routes/YogaForHappiness.routes');
const { tripsRouter } = require('./src/Routes/Trips.routes');
const { secretRouter } = require('./src/Routes/SecretsOfSuccess.routes');
const { galleryRouter } = require('./src/Routes/Gallery.routes');
const { festivalRouter } = require('./src/Routes/Festivals.routes');
const { artRouter } = require('./src/Routes/ArtOfMind.routes');
const { userRouter } = require('./src/Routes/User.routes');
const razorPayRouter = require('./src/Routes/Razopay.routes');
const { adminYogaRouter } = require('./src/Routes/Admin.yoga.routes');
const { adminArtControlRouter } = require('./src/Routes/Admin.artControl.routes');
const { adminSecretSuccessControlRouter } = require('./src/Routes/Admin.secretSuccess.routes');
const { adminResidencyControlRouter } = require('./src/Routes/Admin.residency.routes');
const { adminTripsControlRouter } = require('./src/Routes/Admin.trips.routes');
const { adminGalleryRouter } = require('./src/Routes/Admin.gallery.routes');
const { adminFestivalRouter } = require('./src/Routes/Admin.festival.routes');
const { adminBlogsRouter } = require('./src/Routes/Admin.Blogs.routes');
const  register  = require('./src/Routes/WhatsApp.routes');
const cron = require('node-cron');
const { sendEventReminders } = require('./src/Controllers/remainnderController');
const app = express();


const corsOptions = {
    origin: [
      "http://localhost:3000",
      "https://folk-client.onrender.com",
      "https://folk-client-qjda871kw-techteam-iskconhubli.vercel.app",
      "https://folk-client-b6mef2viv-techteam-iskconhubli.vercel.app",
      "https://folk-client-git-main-techteam-iskconhubli.vercel.app",
      "https://folk-client-iota.vercel.app",
      "https://folk-clients.vercel.app",
      "https://folk-clients-git-main-sivabalajieevana-12s-projects.vercel.app",
      "https://folk-clients-jydn3udwk-sivabalajieevana-12s-projects.vercel.app"
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200
  };
  

app.use(cookieParser())
app.use(cors(corsOptions)); 
app.use(express.json());

app.use("/api/yoga", yogaRouter);
app.use("/api/trips", tripsRouter);
app.use("/api/secrets", secretRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/festival", festivalRouter);
app.use("/api/arts", artRouter);
app.use("/api/users", userRouter);
app.use("/api/payments", razorPayRouter);
app.use("/api/adminYoga", adminYogaRouter);
app.use("/api/adminArtControl", adminArtControlRouter);
app.use("/api/adminSecretSuccess", adminSecretSuccessControlRouter);
app.use("/api/adminResidency", adminResidencyControlRouter)
app.use("/api/adminTrips", adminTripsControlRouter)
app.use("/api/adminGallery", adminGalleryRouter)
app.use("/api/adminFestival", adminFestivalRouter)
app.use("/api/adminBlogs", adminBlogsRouter)
app.use("/api/whatsapp", register);
// cron.schedule("*/1 * * * *", async () => {
//   console.log("Running scheduled reminder job...");
//   try {
//     // Mock req, res to call your function
//     await sendEventReminders({}, {
//       status: (code) => ({ send: (msg) => console.log(msg) }),
//     });
//   } catch (err) {
//     console.error("Scheduled job error:", err);
//   }
// });
app.listen(2346,()=>{
    try {
        Connection()
        console.log('listening on port 2346');
    } catch (error) {
        console.log(error.message)
    }
})