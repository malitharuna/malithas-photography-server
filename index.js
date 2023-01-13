const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware 
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0b62e8i.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        const serviceCollection =client.db('malithas-photography').collection('serviceCollection')
    }
    finally{

    }
}
run().catch(err=> console.error(err))


app.get('/',(req,res)=>{
    res.send("Server is Running");
});

app.listen(port,()=>{
    console.log(`Server is Running on Port ${port}`)
});