const jwt = require("jsonwebtoken");
const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

exports.signup = async (req,res)=>{
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({error:"All fields are required"})
        }
    
        const user = await prisma.User.findUnique({
            where: {
                name:username
            }
        })
    
        if(user){
            return res.status(400).json({error:"User already exists"})
        }
    
        const hashed_password = bcrypt.hashSync(password,10);
        const new_user = await prisma.User.create({
            data:{
                name: username,
                email: email,
                password: hashed_password 
            }
        })
    
        res.status(201).json({message:"User created successfully"})

    }
    catch(err){
        res.status(400).send(err);
    }
}

exports.login = async (req,res)=>{
    try{
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({error:"All fields are required"})
        }
    
        const old_user = await prisma.User.findUnique({
            where:{
                name:username
            }
        })
    
        if(!old_user){
            return res.status(401).json({error: "Invalid credentials"})
        }
    
        const valid_password = bcrypt.compareSync(password,old_user.password);
        if(!valid_password){
            return res.status(401).json({error: "Invalid credentials"})
        }
    
        const token = jwt.sign({id:old_user.id, name: username}, process.env.JWT_SECRET, {expiresIn:'1h'});
        res.cookie("token", token,{ 
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'none',
            maxAge: 3600000
        });

        res.json({message:"login successfull"});

    }
    catch(err){
        res.send(err);
    }

}

exports.authMiddleware = (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).send("Token missing");
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       
        req.user = decoded;
        next();
    }catch{
        res.status(401).send("Invalid token");
    }
}