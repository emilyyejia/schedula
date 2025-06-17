const path = require("path");
const express = require("express");
const logger = require("morgan");
const app = express();
require("dotenv").config();
require("./db");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/appointments", require("./routes/appointment"));
app.use("/api/teachers", require("./routes/teacher"));
app.use("/api/sessions", require('./routes/session'));
app.get("/*splat", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`The express app is listening on ${port}`);
});
