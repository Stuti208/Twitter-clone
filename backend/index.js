// import express from 'express'
// import cors from 'cors'
// import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'
const express = require('express');
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = 3000

app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://twitter_admin:4PijnWRxRX7kCMMM@cluster0.ooqtopn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const postCollections = client.db("database").collection('posts');
    const userCollections = client.db("database").collection('users');
    const friendCollections = client.db("database").collection('friends');

    app.get('/post', async (req,res) => {
      const post = await postCollections.find().toArray();
      res.send(post);
    })

    app.get('/userdata', async (req,res) => {
      const userdata = await userCollections.find().toArray();
      res.send(userdata);
    })

    app.get('/loggedInUser', async (req, res) => {
      const email = req.query.email;
      const user = await userCollections.find({ email: email }).toArray();
      res.send(user);
    })

    app.get('/loggedInUserFriends', async (req, res) => {
      const email = req.query.email;
      const friends = await friendCollections.findOne({ email: email }).toArray();
      res.send(friends);
    })

    app.get('/userPost', async (req, res) => {
      const email = req.query.email;
      const userPost = await postCollections.find({ email: email }).toArray();
      res.send(userPost);
    })

    app.get('/bookmarkUserPost', async (req, res) => {
      // const email = req.query.email;
      const bookmark = req.query.bookmark;
      // const userPost = await postCollections.find({ $and: [{ email: email }, { bookmark: bookmark }]}).toArray();
      const userPost = await postCollections.find({bookmark: bookmark }).toArray();
      res.send(userPost);
    })

    // app.get('/postdata', async (req, res) => {
    //   const postid = req.body;
    //   // const objectId=new objectId(postid)
    //   const postdata = await postCollections.findOne({ _id: new ObjectId(postid) })
    //   res.send(postdata);
    // })

    app.delete('/deletePost/:id', async (req, res) => {
      try {
        const postid = req.params.id;
        const result = await postCollections.deleteOne({_id:new ObjectId(postid)});
        res.send({ result });
      }
      catch (error) {
        console.log(error)
      }
      // const id = new ObjectId(postid);

      // const objectId = new ObjectId(postid);
      
    })

    app.post('/post', async (req, res) => {
      const post = req.body;
      const result = await postCollections.insertOne(post);
      res.send(result);
    })

    app.post('/userdata', async (req, res) => {
      const userdata = req.body;
      const result = await userCollections.insertOne(userdata);
      res.send(result);
    })

    app.post('/friendsdata', async (req, res) => {
      const friendsdata = req.body;
      const result = await friendCollections.insertOne(friendsdata);
      res.send(result);
    })

    app.patch('/userUpdates/:email', async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const updateDoc = { $set: profile };
      const options = { upsert: true };
      const result = await userCollections.updateOne(filter, updateDoc, options);
      res.send(result);

    })

    // app.patch('/userUpdates/:email', async (req, res) => {
    //   const filter = req.params;
    //   const profile = req.body;
    //   const updateDoc = { $set:  {"createdAt":  {$toDate : "$createdAt"} };
    //   const options = { upsert: true };
    //   const result = await userCollections.updateOne(filter, updateDoc, options);
    //   res.send(result);

    // })

    app.patch('/postUpdates/:userid', async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const updateDoc = { $set: profile };
      const options = { upsert: true };
      const result = await postCollections.updateMany(filter, updateDoc, options);
      res.send(result);

    })

    app.patch('/addfriendUpdates/:userid', async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const updateDoc = { $addToSet: profile };
      const options = { upsert: true };
      const result = await friendCollections.updateOne(filter, updateDoc, options);
      res.send(result);

    })

    app.patch('/deletefriendUpdates/:userid', async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const updateDoc = { $pull: profile };
      const result = await friendCollections.updateOne(filter, updateDoc);
      res.send(result);

    })


    app.patch('/uniquePostUpdate/:postid', async (req, res) => {
      const postid = req.params.postid;
      // const filter = req.params;
      const profile = req.body;
      const updateDoc = { $set: profile };
      const options = { upsert: true };
      const result = await postCollections.updateOne({_id:new ObjectId(postid)}, updateDoc, options);
      res.send(result);

    })
      
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  }
  catch (error) {
    console.log(error)
  }
  // finally {
  //   // Ensures that the client will close when you finish/error
  //   await client.close();
  // }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World from Stuti')
})

app.listen(port, () => {
  console.log(`Twitter app listening on port ${port}`)
})