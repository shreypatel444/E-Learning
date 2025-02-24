const express = require("express");
const index = express();
const path = require("path");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 8000;
const PathPublic = path.join(__dirname, "/public");
const exp = require("constants");
require("./db/connection");
const Techformregister = require("./models/model");
const Signupregister = require("./models/signmodel");

index.use(express.json());
index.use(express.urlencoded({ extended: false }));

index.use(express.static(PathPublic));

index.set("view engine", "hbs");

index.get("/", (req, res) => {
  res.render("index");
});

index.get("/index", (req, res) => {
  res.render("index");
});

index.get("/contact", (req, res) => {
  res.render("contact.hbs");
});

index.get("/cpp", (req, res) => {
  res.render("cpp");
});

index.get("/front-end", (req, res) => {
  res.render("front-end");
});

index.get("/java", (req, res) => {
  res.render("java");
});

index.get("/python", (req, res) => {
  res.render("python");
});

index.get("/test", (req, res) => {
  res.render("test");
});

index.get("/tutors", (req, res) => {
  res.render("tutors");
});

index.get("/videos", (req, res) => {
  res.render("videos");
});

index.get("/register", (req, res) => {
  res.render("register");
});

index.post("/register", async (req, res) => {
  try {
    const Data = new Techformregister({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      text: req.body.text,
    });
    const Sdata = await Data.save();
    res.json("Your respond send succesfully!");
  } catch (error) {
    console.log(error);
  }
});

index.get("/signup", (req, res) => {
  res.render("Signup");
});

index.post("/signup", async (req, res) => {
  try {
    const Datastore = new Signupregister({
      name: req.body.name,
      email: req.body.username,
      password: req.body.password,
    });

    const data = await Datastore.save();
    res.json("You are signup succesfully :)");
  } catch (error) {
    console.log(error);
  }
});

index.get("/login", (req, res) => {
  res.render("Login");
});

index.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const Storage = await Signupregister.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, Storage.password);
    if (isMatch) {
      res.render("index");
    } else {
      res.send("Invalid Login Details!");
    }
  } catch (error) {
    res.send("Invalid LoginId!");
  }
});

index.listen(port, () => {
  console.log(`You are listining on port ${port}`);
});
