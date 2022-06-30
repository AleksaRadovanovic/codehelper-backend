//const { application } = require('express');
const express = require("express");
const config = require("./config/config");
const cors = require("cors");
const app = express();

app.get("/", (req, res) =>{
    console.log("here");
   // res.status(500).json({message:"Error"});
    res.send("hi"); 
})

const userRouter = require('./routes/user')

app.use(cors())
app.use(express.json())

app.use("/user", userRouter)



app.listen(config.port);