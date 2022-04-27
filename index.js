const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const { use } = require("express/lib/application");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//database connected

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c0ohf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const servicesCollection = client
      .db("benevolentNetwork")
      .collection("services");
    const usersCollection = client.db("benevolentNetwork").collection("users");
    const eventsCollection = client
      .db("benevolentNetwork")
      .collection("events");

    //get operation
    app.get("/services", async (req, res) => {
      const query = req.query;
      const cursor = servicesCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    //post operation
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });
    //post user get operation
    app.get("/user", async (req, res) => {
      const query = req.query;
      const cursor = usersCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // delete user info
    app.delete("/user/:id", async (req, res) => {
      const id = req.params;
      const query = { _id: ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });
    //events collection
    app.get("/events", async (req, res) => {
      const query = req.query;
      const cursor = eventsCollection.find(query);
      const events = await cursor.toArray();
      res.send(events);
    });
    app.post("/event", async (req, res) => {
      const user = req.body;
      const result = await eventsCollection.insertOne(user);
      res.send(result);
    });
    app.delete("/event/:id", async (req, res) => {
      const id = req.params;
      const query = { _id: ObjectId(id) };
      const result = await eventsCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// init route
app.get("/", (req, res) => {
  res.send("benevolent network server running");
});

//listing port
app.listen(port, () => {
  console.log("benevolent network server running", port);
});
