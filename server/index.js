import express from "express";
import { Mongodb_Url } from "./config.js";
import mongoose from "mongoose";
import user from './routes/user.js';
import cors from 'cors';
import passport from "passport";
import { password } from "./passport.js";
const app=express();

app.use(passport.initialize());
password();

const port=process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.use('/user', user);




mongoose.connect(Mongodb_Url)
.then(()=>{
    console.log('Succesfully Connected...');
    app.listen(port, ()=>{
        console.log(`Server is listening ${port}`);
    });

})
.catch((error)=>{
    console.log(error);
})