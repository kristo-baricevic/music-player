import { Request, Response, NextFunction } from "express";
import cors from "cors";
import { loadInitialSong, getSongById } from "./controllers/songController";

const express = require("express");
const path = require("path");

const app = express();

const port = 5000;

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use('/static', express.static(path.join(__dirname, 'storage')));
console.log(path.join(__dirname, 'storage'));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/api/songs", loadInitialSong);
app.get("/api/songs/:id", getSongById);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Aw here we go.");
});
