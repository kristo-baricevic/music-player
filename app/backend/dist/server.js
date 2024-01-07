"use strict";
const express = require("express");
const path = require("path");
const cors = require("cors");
const { loadInitialSong, getSongById } = require("./controllers/songController");
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001",
}));
app.use('/static', express.static(path.join(__dirname, 'storage')));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
app.get("/api/songs", loadInitialSong);
app.get("/api/songs/:id", getSongById);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Aw here we go.");
});
