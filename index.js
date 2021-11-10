const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const cors = require('cors');

require('dotenv').config();
const { MongoClient } = require('mongodb');
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.korjs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  
  app.get("/", (req, res) => {
    res.send("connected Server");
  });
  
  client.connect((err) => {
    const productsCollection = client.db("flyodrone").collection("products");
    const usersCollection = client.db("flyodrone").collection("users");
    const ordersCollection = client.db("flyodrone").collection("orders");
    const reviewCollection = client.db("flyodrone").collection("review");
  
    //add A Product
    app.post("/addProducts", async (req, res) => {
      const result = await productsCollection.insertOne(req.body);
      res.send(result);
    });
  
    // get all Product
    app.get("/allProducts", async (req, res) => {
      const result = await productsCollection.find({}).toArray();
      res.send(result);
    });
  
    // Product Details 

    app.get("/singleProduct/:id", async (req, res) => {
      const result = await productsCollection
        .find({ _id: ObjectId(req.params.id) })
        .toArray();
      res.send(result[0]);
    });
  
    // insert order 

    app.post("/addOrders", async (req, res) => {
      const result = await ordersCollection.insertOne(req.body);
      res.send(result);
    });

    /// all order
    app.get("/allOrders", async (req, res) => {
      const result = await ordersCollection.find({}).toArray();
      res.send(result);
    });
  
    //  my order
  
    app.get("/myOrder/:email", async (req, res) => {
      const result = await ordersCollection
        .find({ email: req.params.email })
        .toArray();
      res.send(result);
    });
  
    // // review
    // app.post("/addSReview", async (req, res) => {
    //   const result = await reviewCollection.insertOne(req.body);
    //   res.send(result);
    // });
  
    // app.post("/addUserInfo", async (req, res) => {
    //   console.log("req.body");
    //   const result = await usersCollection.insertOne(req.body);
    //   res.send(result);
    //   console.log(result);
    // });
    // //  make admin
  
    // app.put("/makeAdmin", async (req, res) => {
    //   const filter = { email: req.body.email };
    //   const result = await usersCollection.find(filter).toArray();
    //   if (result) {
    //     const documents = await usersCollection.updateOne(filter, {
    //       $set: { role: "admin" },
    //     });
    //     console.log(documents);
    //   }
      // else {
      //   const role = "admin";
      //   const result3 = await usersCollection.insertOne(req.body.email, {
      //     role: role,
      //   });
      // }
  
      // console.log(result);
    // });
  
    // // check admin or not
    // app.get("/checkAdmin/:email", async (req, res) => {
    //   const result = await usersCollection
    //     .find({ email: req.params.email })
    //     .toArray();
    //   console.log(result);
    //   res.send(result);
    // });
  
    // // status update
    // app.put("/statusUpdate/:id", async (req, res) => {
    //   const filter = { _id: ObjectId(req.params.id) };
    //   console.log(req.params.id);
    //   const result = await ordersCollection.updateOne(filter, {
    //     $set: {
    //       status: req.body.status,
    //     },
    //   });
    //   res.send(result);
    //   console.log(result);
    // });
  });
  
  app.listen(process.env.PORT || port);