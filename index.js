const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express());

//database connected

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.c0ohf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const ServicesCollection = client
    .db("benevolentNetwork")
    .collection("services");
  console.log("mongodb connect");

  // perform actions on the collection object
  client.close();
});

// init route
app.get("/", (req, res) => {
  res.send("benevolent network server running");
});

//listing port
app.listen(port, () => {
  console.log("benevolent network server running", port);
});
