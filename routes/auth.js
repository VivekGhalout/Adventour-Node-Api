const express = require('express');
const bcrypt = require('bcrypt');
const { UserModel } = require('../models/user.model');
var jwt = require('jsonwebtoken');
require('dotenv').config();


const authRouter = express.Router();


authRouter.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
        res.status(302).send('User already exist')
    } else {
        const hashPassword = bcrypt.hashSync(password, 6);
        const user = new UserModel({
            name,
            email,
            password: hashPassword
        })
        await user.save();
        res.status(201).send('Signup successful');
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
        res.status(404).send('User not fount');
    } else {
        const authUser=bcrypt.compareSync(password, existUser.password);
        if(authUser){
            const token=jwt.sign({userId: existUser._id }, process.env.SECRET);
            res.status(202).send({msg:token, name:existUser.name});
        }else{
            res.status(401).send('Invalid credential');
        }
    }
})


module.exports={authRouter};

