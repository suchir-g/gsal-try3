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
const questionsData = require("./public/questions2.json");

const calculateScore = (choices) => 400; // DO THIS OALTERsss
const calculateText = (score) => {
  if (score < 200) {
    return "Dear User,<br><br>We have received your carbon score report, and it seems that your score is quite low. We understand that it can be disheartening to receive news like this, but we want to assure you that there are ways to improve your score and make a positive impact on the environment.<br><br>It's important to understand that small changes can make a big difference. Perhaps you could start by reducing your energy usage, such as turning off lights and unplugging electronics when not in use. Additionally, consider reducing your meat consumption and opting for plant-based meals more often.<br><br>We encourage you to continue taking steps to reduce your carbon footprint and make a positive impact on the environment. With a little effort, we're confident that you can improve your score and be proud of the difference you're making.";
  } else if (score < 400) {
    return "Dear User,<br><br>We're happy to report that your carbon score is improving! While there's still room for improvement, we're excited to see that you're taking steps to reduce your carbon footprint.<br><br>It's clear that you're making a conscious effort to be more environmentally friendly, such as reducing your energy usage and opting for public transportation or walking when possible. Keep up the great work!<br><br>We encourage you to continue finding ways to reduce your carbon footprint and make a positive impact on the environment. Your efforts are making a difference, and we hope to see your score continue to rise.";
  } else if (score < 600) {
    return "Dear User,<br><br>Congratulations on your impressive carbon score! Your commitment to reducing your carbon footprint is truly commendable, and we're thrilled to see the positive impact you're making on the environment.<br><br>Your efforts to reduce energy usage, drive less, and opt for more sustainable products and practices are truly making a difference. We encourage you to continue finding ways to reduce your carbon footprint, and to share your knowledge and experience with others.<br><br>Thank you for being a leader in environmental sustainability. Keep up the great work!";
  } else if (score < 800) {
    return "Dear User,<br><br>Your carbon score is incredible! You're making a significant impact on the environment and serving as an inspiration to others. Your commitment to reducing your carbon footprint is truly commendable, and we can't express enough how impressed we are.<br><br>Your actions, such as reducing energy usage, driving less, and incorporating sustainable practices into your daily life, are setting an example for others to follow. We encourage you to continue finding ways to make a positive impact on the environment and to share your knowledge and experience with others.<br><br>Thank you for being a leader in environmental sustainability. We're excited to see the difference you'll continue to make.";
  } else {
    return "Dear User,<br><br>We're ecstatic to report that your carbon score is off the charts! Your commitment to environmental sustainability is awe-inspiring, and we're proud to see the impact you're making on the planet.<br><br>Your dedication to reducing energy usage, driving less, opting for sustainable products and practices, and sharing your knowledge with others is making a significant difference. You're truly a leader in environmental sustainability and an inspiration to all.<br><br>We encourage you to continue finding ways to reduce your carbon footprint and make a positive impact on the environment. Your efforts are making a significant difference, and we're excited to see the impact you'll continue to make in the future.<br><br>Thank you for being an environmental superhero! Keep up the outstanding work.";
  }
};
app.get("/", (req, res) => {
  res.render("main-page");
});

app.get("/game", (req, res) => {
  res.render("game/preview.ejs");
});

app.get("/game/play", (req, res) => {
  res.render("game/index.ejs", { questionsData });
});

app.get("/game/results", (req, res) => {
  // console.log(req.query, typeof req.query);
  optionIndexes = Object.values(req.query).map((x) => parseInt(x));
  // console.log(optionIndexes);

  score = calculateScore(optionIndexes);
  text = calculateText(score);
  res.render("game/results.ejs", { score: score, text: text });
});

app.use((_, res) => {
  res.status(404).render("404");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
