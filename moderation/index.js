import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const PORT = 4003;
const EVENT_BUS_URL = "http://localhost:4005/events";

const app = express();
app.use(bodyParser.json());

// POST /events
// Receive events from event bus
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";

    await axios.post(EVENT_BUS_URL, {
      type: "CommentModerated",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
