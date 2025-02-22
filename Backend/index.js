import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import localStrategy from 'passport-local';
import User from './models/usermodel.js';
import userRoutes from './routes/userroutes.js';
const app=express();
dotenv.config();
const PORT=process.env.PORT || 5000;
const url=process.env.MONGO_URL;
app.use(bodyParser.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// MongoDB Connection
const dbconnect=async()=>{
    try{
        await mongoose.connect(url);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

dbconnect();
app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.use('/user',userRoutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
