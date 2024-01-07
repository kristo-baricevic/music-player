const express = require("express");
const path = require("path");
const cors = require("cors");
const songRouter = require("./controllers/songController");

const app = express();

const PORT = 5000;

// app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001",
  })
);

// app.use('/static', express.static(path.join(__dirname, 'storage')));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get("/home", (req, res) => {
  res.send("Hello joe!");
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Aw here we go.");
});
