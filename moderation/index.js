import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const PORT = 4003;

const app = express();
app.use(bodyParser.json());

// POST /events
// Receive events from event bus
app.post("/events", async (req, res) => {});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
