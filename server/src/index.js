import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";



const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
console.log("Using FRONTEND_URL:", process.env.FRONTEND_URL);
app.use(express.json());
app.use(cookieParser());
connectDB();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});
app.use("/api", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

