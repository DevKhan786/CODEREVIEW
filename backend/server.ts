import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json({ limit: "10mb" }));

app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRoutes);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
