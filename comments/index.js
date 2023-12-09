import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { randomBytes } from "crypto";
import axios from "axios";

const PORT = 4001;
const EVENT_BUS_URL = "http://localhost:4005/events";

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory database
const commentsByIssueId = {};

app.get("/issues/:id/comments", (req, res) => {
  res.send(commentsByIssueId[req.params.id] || []);
});

app.post("/issues/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comments = commentsByIssueId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByIssueId[req.params.id] = comments;

  await axios.post(EVENT_BUS_URL, {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

// Receive events from event bus
app.post("/events", (req, res) => {
  console.log("Received Event:", req.body.type);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
