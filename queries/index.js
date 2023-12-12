import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = 4002;

const issues = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Get all issues
app.get("/issues", (req, res) => {
  res.send(issues);
});

// Create an issue
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "IssueCreated") {
    const { id, title } = data;

    issues[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, issueId, status } = data;

    const issue = issues[issueId];

    issue.comments.push({ id, content, status });
  }

  console.log("Issues: ", issues);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
