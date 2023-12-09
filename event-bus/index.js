import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();

app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  // POST to issues service
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  // POST to comments service
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  // POST to query service
  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
