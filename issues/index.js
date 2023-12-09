import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { randomBytes } from "crypto";
import axios from "axios";

const PORT = 4000;
const EVENT_BUS_URL = "http://localhost:4005/events";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory database
const issues = {};

// Get all issues
app.get("/issues", (req, res) => {
  res.send(issues);
});

// Create an issue
app.post("/issues", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  issues[id] = {
    id,
    title,
  };

  await axios.post(EVENT_BUS_URL, {
    type: "IssueCreated",
    data: {
      id,
      title,
    },
  });

  res.status(201).send(issues[id]);
});

// Receive events from event bus
app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
