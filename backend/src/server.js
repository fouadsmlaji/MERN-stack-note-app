import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from 'path'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve(); // get the current directory

// CORS must be configured BEFORE routes
if (process.env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: "http://localhost:5173", // Frontend URL
      credentials: true,
    })
  );
}

app.use(express.json()); // this is a middleware that will be used to parse the body of the request
app.use(rateLimiter); // this is a middleware that will be used to rate limit the requests
app.use("/api/notes", notesRoutes); // this is a middleware that will be used for all routes in the notesRoutes file

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist'))); // serve the static files in the dist folder
  // Catch-all handler: send back React's index.html file for all non-API routes
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

connectDB() // connect to the database before starting the server
  .then(() => {
    app.listen(PORT, async () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1); // exit with failure
  });
