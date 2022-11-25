const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require("helmet");
require("dotenv").config();
const mongoose = require('mongoose');
const User=require('./module/User');


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(helmet());

const uri= process.env.URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
 mongoose.connection.on("connected", function () {
  console.log("Connect to database");
});

app.post("/Add-user", async (req, res) => {
    const newUser = new User({
      Name:req.body.Name,
      Phone:req.body.Phone,
      Email:req.body.Email,
      Address:req.body.Address,
      Password:req.body.Password,
    });
  
    const responseFromDB = await newUser.save();
  
    res.status(200).json({
      message: "User created successfully",
      success: true,
      responseFromDB,
    });
  });

  app.get("/Add-user", async (req, res) => {
    console.log("GET request received");
  const users = await User.find();
  res.status(200).json({
    message: "User fetched successfully",
    success: true,
    users,
  });
});

//Delete request
app.delete("/Add-user/:id", async (req ,res)=>{
  const id = req.params.id;
  const responseFromDB = await User.findByIdAndDelete(id);

  res.status(200).json({
    message:'User deleted successfully',
    success:'true',
    responseFromDB,
  });
});

//put request
app.put("/Add-user/:id", async(req, res)=>{
  const id = req.params.id;
  
  const responseFromDB = await User.findByIdAndUpdate(id ,
    {
      Name:req.body.Name,
      Phone:req.body.Phone,
      Email:req.body.Email,
      Address:req.body.Address,
      Password:req.body.Password,
      
    },
    {
      new: true,
    });

  res.status(200).json({
    message:'User updated successfully',
    success:'true',
    responseFromDB,
  });
});

app.get('/', function (req, res) {
  res.send('Hello World')
});

const port = process.env.port||3500;
app.listen(port,()=>{
    console.log(`Server is running on port: http://localhost:${port}`)
});
