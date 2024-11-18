import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const  __dirname = path.resolve();


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'frontend/dist')));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on PORT = ${PORT}`);
  connectDB();
});
