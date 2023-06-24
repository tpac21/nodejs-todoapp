const express = require("express");
const app = express();
const taskRoute = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
app.use(express.json());
app.use(express.static("./public"));

const PORT = 5000;
// routing
app.use("/api/v1/tasks", taskRoute);
// connect to database
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, console.log("server is running"));
  } catch (err) {
    console.log(err);
  }
};
start();
