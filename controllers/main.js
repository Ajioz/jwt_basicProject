require('dotenv').config()
const { BadRequestError } = require("../errors");
const jwt = require('jsonwebtoken')


//just for demo purposes, usually this comes from db
const id = new Date().getDate()

// retrieve Secret Ket
const secret = process.env.JWT_SECRET


exports.login = async(req, res) => {
    const { username, password } = req.body;

    if(!username || !password){
        throw new BadRequestError('Please provide email and password')
    } 
    const token = jwt.sign({id, username}, secret, { expiresIn: '30d' })
    res.status(200).json({ msg: 'user created', token })
}

exports.dashboard = async(req, res) => {
    // const { username } = req.user;
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({
        msg: `Hello, ${req.user.username}`, 
        secret: `Here is authorised number, voila your number is: ${luckyNumber}`
    })
}