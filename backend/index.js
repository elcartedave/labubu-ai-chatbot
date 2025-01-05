import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { login, signup } from "./controllers/authController.js";
import { query } from "./controllers/chat.Controllers.js";

const app = express();
app.use(cors(
     {
        origin: ["https://labubu-ai-chatbot-frontend.vercel.app"],
        methods: ["POST", "GET"],
    }
))
app.use(express.json());

try{
    await mongoose.connect("mongodb+srv://daelcarte:giC54IZBgtvnCWe8@cluster0.c2sn5.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Mongoose connected")
}catch(error){
    console.error(`Error: ${error.message}`);
    process.exit(1);
}

app.get("/", (req,res)=>{
    res.json("Hello");
})
app.post("/sendMessage", query)
app.post("/signup", signup)
app.post("/login", login)

app.listen(3000, ()=>{
    console.log("Server started at port 3000")
})