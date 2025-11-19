import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import taskRouter from "./routes/taskROute.js";
import boardRouter from "./routes/boardRoute.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/", taskRouter);   
app.use("/", boardRouter); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});