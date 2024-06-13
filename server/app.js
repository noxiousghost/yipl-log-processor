import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import eventRoutes from "./routes/eventRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Allow only the client on port 3000
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
// Enable CORS
app.use(cors(corsOptions));

// Parse JSON bodies
app.use(bodyParser.json());

app.use("/api", eventRoutes);
app.use("/auth", authRoutes);

// Basic route
app.get("/", (req, res) => {
  res.send("Event Management API");
});

export default app;
