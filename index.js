import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./database/dbConfig.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("<h1 style=text-align:center>Welcome to Password Reset Backend<h1>");
});

app.listen(port, () => {
  console.log(`Connected to the port`, port);
});
