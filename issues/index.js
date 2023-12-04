import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { randomBytes } from "crypto";

const PORT = 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// In-memory database
const issues = {};

app.get("/issues", (req, res) => {
  res.send(issues);
});

app.post("/issues", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  issues[id] = {
    id,
    title,
  };

  res.status(201).send(issues[id]);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
