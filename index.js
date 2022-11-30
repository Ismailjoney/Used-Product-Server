const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

//reused-products
//J7qF9x7AHSIJEhdh

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


 

 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i8hxp3j.mongodb.net/?retryWrites=true&w=majority`;
 const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

 async function run(){
    try{
        const userColection = client.db("reusedProducts").collection("categories");
        const  categoriesColection = client.db("reusedProducts").collection("productCategories");
        const  allUserColection = client.db("reusedProducts").collection("userCollection");
        const bookingCollection = client.db("reusedProducts").collection("bookingCollection");
       

        // get categories
        app.get('/categories', async(req,res) => {
            const query = {};
            const coursor = userColection.find(query);
            const categories = await coursor.toArray();
            res.send(categories)
        
        })
        
        //specifice all categorie id:
        app.get('/productCategories/:id', async(req,res) => {
            const id = req.params.id;
            console.log(id)
            const query = {category_id : id};
            const coursor = categoriesColection.find(query);
            const categories = await coursor.toArray();
            res.send(categories)
        
        })
        //booking collection:
        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            console.log(booking);
            const query = {
                // title: booking.title, 
                // email: booking.email, 
            }
            //const alreadyBooked = await bookingCollection.insertOne(query).toArray();
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        })
        //My order(booking)-------------------------------------
        app.get('/booking', async(req,res)=>{
            const query = {
                
            };
            const coursor = bookingCollection.find(query);
            const booking = await coursor.toArray();
            res.send(booking)
        })
        //buyer and seller collection
        app.post('/userCollection', async(req,res) =>{
            const users = req.body;
            console.log(users)
            const resualt = await allUserColection.insertOne(users)
            res.send(resualt)
        })
 
    }
    finally{

    }

 } 
run().catch(error => console.log(error));







 








app.get('/', async (req, res) => {
    res.send('reuse product  server is running');
})




app.listen(port, () => console.log( `reuse product  running on ${port}`))
