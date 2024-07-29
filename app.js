import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import UserRoute from "./router/user.route.js"
import config from "./config.js";
const app = express();

mongoose.connect(config.dbConnectionUrl);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

app.use('/user',UserRoute);

app.listen(3000,()=>{
console.log("server Started .....");
});