import express from "express";
import bodyParser from "body-parser";
import { randomBytes } from "crypto";

const PORT = 4001;

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/issues/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/issues/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");

  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content });

  commentsByPostId[req.params.id] = comments;

  res.status(201).send(comments);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
