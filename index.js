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
  res.send(`<h1 style=text-align:center>Welcome to Password Reset Backend<h1>
  <ul>
  <li>
  <h3>POST: Use the endpoint to <span style="background-color:yellow">/api/user/register</span> To create a new user</h3>
  </li>
  <li>
  <h3>POST: Use the endpoint to <span style="background-color:yellow">/api/user/login</span> To login in to user dashboard</h3>
  </li>
  <li>
  <h3>POST: Change the endpoint to <span style="background-color:yellow">/api/user/forgotPassword</span> To request password reset link to your mail Id</h3>
  </li>
  <li>
  <h3>PUT: Change the endpoint to <span style="background-color:yellow">/api/user/resetPassword</span> To reset password for a user</h3>
  </li>
  <li>
  <h3>GET: Change the endpoint to <span style="background-color:yellow">/api/user/list-all-users</span>To show all users</h3>
  </li>
  </ul>
  `);
});

app.listen(port, () => {
  console.log(`Connected to the port`, port);
});
