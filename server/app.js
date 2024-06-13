import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Event Management API");
});

export default app;
