const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const User = require('./user.model')

mongoose.connect("mongodb+srv://praneeth:praneeth@basicnodeconnect.x8dsf.mongodb.net/TodoApp?retryWrites=true&w=majority&appName=BasicNodeConnect")
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err)
})

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/allUsers', (req, res) => {
    const users = User.find()
    .then((users) => {
        res.json({result: true, data: users})
    })
    .catch((err) => {
        console.log({result: false, message: err})
    })
})

app.post('/signIn', (req, res) => {
    const { email, password } = req.body
    const user = User.findOne({email: email})
    .then((user) => {
        if(user.password === password){
            const token = jwt.sign({email: user.email, role: user.role}, "secret")
            res.json({result: true, token: token})
        }
        else{
            res.json({result: false, message: "Incorrect Password"})
        }
    })
    .catch((err) => {
        res.json({result: false, message: "User not found"})
    })
})

app.post('/signUp', (req, res) => {
    const { email, password, role } = req.body
    const user = new User({email: email, password: password, role: role})
    user.save()
    .then((user) => {
        res.json({result: true, message: "User created"})
    })
    .catch((err) => {
        res.json({result: false, message: "User not created"})
    })
})

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})
