const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) return res.status(400).send("Nie podano nazwy użytkownika");
  if (!email) return res.status(400).send("Nie podano maila");
  if (!password) return res.status(400).send("Nie podano hasła");

  const exitName = await User.findOne({ name: name });
  if (exitName) return res.status(400).send("Nazwa znajduje już się w bazie");
  const exitEmil = await User.findOne({ email: email });
  if (exitEmil) return res.status(400).send("Email znajduje już się w bazie");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    password: hashPassword,
    email,
  });

  try {
    saveUser = await user.save();
    res.send(saveUser._id);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name) return res.status(400).send("Nie podano nazwy użytkownika");
  if (!password) return res.status(400).send("Nie podano hasła");

  const user = await User.findOne({ name: name });
  if (!user) return res.status(400).send("Błędny login lub hasło");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Błędny login lub hasło");

  res.send(user._id);
});

module.exports = router;
