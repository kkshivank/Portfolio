import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose"; 
import cookieParser from "cookie-parser";

import router from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
console.log("Using FRONTEND_URL:", process.env.FRONTEND_URL);

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Serverless-Optimized DB Connection
const connectDB = async () => {
  // If already connected, reuse the existing connection
  if (mongoose.connection.readyState === 1) {
    return;
  }
  
  // If currently connecting, wait for it to finish
  if (mongoose.connection.readyState === 2) {
    return;
  }

  try {
    // Note: useNewUrlParser and useUnifiedTopology are deprecated in Mongoose 6+ 
    // and no longer needed in your connection string.
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error; // Crucial: Throw the error so the middleware catches it
  }
};

// Async Middleware - Routes will only execute AFTER the DB is connected
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error: Database unavailable" });
  }
});

// Routes
app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});
app.use("/api", router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;