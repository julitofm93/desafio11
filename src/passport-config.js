import passport from 'passport';
import local from 'passport-local'
import { users } from './models/User.js'
import { isValidPassword } from './utils.js';
import { createHash } from './utils.js'

const LocalStrategy = local.Strategy;

export const initializePassport = () =>{
    passport.use('register',new LocalStrategy({passReqToCallback:true},async(req,username,password,done)=>{
        try{
            let user = await users.findOne({username:username});
            if(user) return done(null,false);
            const newUser = {
                username:username,
                password:createHash(password),
                email:req.body.email,
                first_name:req.body.first_name,
                last_name:req.body.last_name,
                address:req.body.address,
                age:req.body.age
            }
            try{
                let result = await users.create(newUser)
                return done(null,result)
            }catch(error){
                return done(error)
            }
        }catch(error){
            return done(error)
        }
    }))
    passport.use('login',new LocalStrategy(async(username,password,done)=>{
        try{
            let user = await users.findOne({username:username})
            if(!user) return done(null,false,{message:'User doesn\'t exist'});
            if(!isValidPassword(user,password)) return done(null,false,{message:"invalid password"});
            console.log('logueado')
            return done(null,user);
        }catch(error){

        }
    }))
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })
    passport.deserializeUser((id,done)=>{
        users.findById(id,done);
    })
}