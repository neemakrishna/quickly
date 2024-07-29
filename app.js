import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import UserRoute from "./router/user.route.js"
const app = express();

mongoose.connect("mongodb+srv://krishna13neema:NlyuD8HnrzrJrSVZ@cluster0.ajwieco.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

app.use('/user',UserRoute);

app.listen(3000,()=>{
console.log("server Started .....");
});