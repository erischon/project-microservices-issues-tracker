import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { randomBytes } from "crypto";

const PORT = 4001;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory database
const commentsByIssueId = {};

app.get("/issues/:id/comments", (req, res) => {
  res.send(commentsByIssueId[req.params.id] || []);
});

app.post("/issues/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comments = commentsByIssueId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByIssueId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
