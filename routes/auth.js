const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!req.body.name)
    return res.status(400).send("Nie podano nazwy użytkownika");
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

  res.send(user);
});

module.exports = router;
