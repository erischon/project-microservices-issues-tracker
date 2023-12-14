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

// GET /issues/:id/comments
// Get all comments for an issue
app.get("/issues/:id/comments", (req, res) => {
  res.send(commentsByIssueId[req.params.id] || []);
});

// POST /issues/:id/comments
// Create a comment for an issue
app.post("/issues/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comments = commentsByIssueId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "pending" });

  commentsByIssueId[req.params.id] = comments;

  // Emit an event to the event bus
  await axios.post(EVENT_BUS_URL, {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      issueId: req.params.id,
      status: "pending",
    },
  });

  res.status(201).send(comments);
});

// POST /events
// Receive events from event bus
app.post("/events", async (req, res) => {
  console.log("Received Event:", req.body.type);

  const { type, data } = req.body;

  if (type === "CommentModerated") {
    const { issueId, id, status, content } = data;

    // Get the comments for the issue with the given id
    const comments = commentsByissueId[issueId];

    // Find the comment with the given id
    const comment = comments.find((comment) => {
      return comment.id === id;
    });

    // Update the status of the comment
    comment.status = status;

    // issue Comment Updated event to event bus
    await axios.post(EVENT_BUS_URL, {
      type: "CommentUpdated",
      data: {
        id,
        issueId,
        status,
        content,
      },
    });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
