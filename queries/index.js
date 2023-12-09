import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = 4002;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Get all issues
app.get("/issues", (req, res) => {});

// Create an issue
app.post("/events", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
