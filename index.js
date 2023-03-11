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

//getting the game data from the questions.json file
const questionsData = require("./public/questions.json");

const calculateScore = (choices) => 400 // DO THIS OALTERsss

app.get("/", (req, res) => {
  res.render("main-page");
});

app.get("/game", (req, res) => {
  console.log(questionsData);
  res.render("game/index.ejs", {questionsData});
});

app.get("/game/results", (req, res) => {
  res.render("game/results.ejs")
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
