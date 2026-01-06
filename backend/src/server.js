import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// CORS must be configured BEFORE routes
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend URL
    credentials: true,
  })
);

app.use(express.json()); // this is a middleware that will be used to parse the body of the request
app.use(rateLimiter); // this is a middleware that will be used to rate limit the requests
app.use("/api/notes", notesRoutes); // this is a middleware that will be used for all routes in the notesRoutes file
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
