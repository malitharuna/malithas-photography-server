const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Server is Running");
});

app.listen(port,()=>{
    console.log(`Server is Running on Port ${port}`)
});