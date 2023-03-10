//setting up the express server
const methodOverride = require("method-override");
const express = require("express");

const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req,res) => {
  res.render("main-page")
})

app.get("/game", (req,res) => {
  res.render("game/index.ejs")
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})