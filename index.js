const express=require('express')
const app =express()
const { MongoClient } = require('mongodb');
const ObjectId=require('mongodb').ObjectId
const cors= require('cors')
require ('dotenv').config()
const port =5000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ffgwy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("emarket");
      const products = database.collection("products");

      app.get('/products', async(req,res)=>{
          const cursor=products.find({})
          const result= await cursor.toArray()
          res.send(result)
      })

      app.get('/products/:id',async(req,res)=>{
         const id=req.params.id
         const query={ _id: ObjectId(id) }
         const result=await products.findOne(query)
         res.send(result)
      })
     
      
      
     
   
    }

     finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);
  
  

app.get('/',(req,res)=>{
    res.send('active the api')
})

app.listen(port ,()=>{
    console.log('server running on port',port)
})