const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
        const feedbackCollection = client.db('malithas-photography').collection('feedbackCollection');

        // get all services
        app.get('/services', async(req, res)  =>{
            const limitQuery=parseInt(req.query.limit);
            const sort = {date:-1}
            if(limitQuery)
            {
                const cursor = serviceCollection.find({}).sort(sort).limit(limitQuery);
                const result = await cursor.toArray();
                return res.send(result)
            }else{
                const cursor = serviceCollection.find({}).sort(sort);
                const result = await cursor.toArray();
                 return res.send(result);
            }
        })

        // service description by id
        app.get('/services/:id', async(req, res) =>{
            const id =req.params.id;
            const query = {_id: ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })

         // store review/feedback

         app.post('/add/feedback',async(req,res)=>{
            const userFeedback = req.body;

            userFeedback.date = new Date();

            const result = await feedbackCollection.insertOne(userFeedback);

            if(result.acknowledged)
            {
                res.send({insert:true})
            }
       })

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