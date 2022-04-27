const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express());

// init route
app.get("/", (req, res) => {
  res.send("benevolent network server running");
});

//listing port
app.listen(port, () => {
  console.log("benevolent network server running", port);
});
