import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./database/dbConfig.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("<h1 style=text-align:center>Welcome to Password Reset Backend<h1>");
});
app.use("/api/user", userRoutes);

app.listen(port, () => {
  console.log(`Connected to the port`, port);
});
