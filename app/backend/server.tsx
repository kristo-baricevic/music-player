import { Request, Response, NextFunction } from "express";
import cors from "cors";

const songsController = require("../backend/controller/songsController");

const express = require("express");

const app = express();

const port = 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/static", express.static("storage"));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/api/songs", songsController.getSongs);
app.get("/api/songs/:id", songsController.getSongById);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Aw here we go.");
});
