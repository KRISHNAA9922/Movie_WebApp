import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingsRouter);

// Database Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000, () =>
      console.log("✅ Connected to Database & Server is running on port 5000")
    );
  })
  .catch((error) => console.error("❌ MongoDB Connection Error:", error.message));
