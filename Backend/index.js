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
import profileRoutes from './routes/profileroutes.js'
const app=express();
const allowedOrigins = [
  "http://localhost:5173", // Allow local development
  "https://emotorad-kappa.vercel.app" // Allow your deployed frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // 🔥 Allow credentials (cookies, tokens)
}));

// Enable preflight for CORS (Fixes OPTIONS request issues)
app.options("*", cors({
  origin: allowedOrigins,
  credentials: true
}));
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
app.use('/profile',profileRoutes)
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
