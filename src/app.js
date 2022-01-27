import MongoStore from 'connect-mongo';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import __dirname from "./utils.js";
import { initializePassport } from './passport-config.js';
const app = express();
const PORT = 8080;
const server = app.listen(PORT,()=>console.log(`Listening on ${PORT}`));
const connection = mongoose.connect('mongodb+srv://Julito:123@prueba.e1gkm.mongodb.net/desafio11?retryWrites=true&w=majority')

app.use(session({
    store: MongoStore.create({mongoUrl:'mongodb+srv://Julito:123@prueba.e1gkm.mongodb.net/desafio11?retryWrites=true&w=majority'}),
    secret:"Coder",
    resave:false,
    saveUninitialized:false
}))
app.use(express.json())
initializePassport();
app.use(passport.initialize());
app.use(passport.session())
app.use(express.static(__dirname+'/public'))

app.post('/register',passport.authenticate('register',{failureRedirect:'/failedRegister'}),(req,res)=>{
    res.send({message:"signed up"})
})

app.post('/failedRegister',(req,res)=>{
    res.send({error:"No se pudo autenticar"})
})