const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { name, password } = req.body;

  if (!name) return res.status(400).send("Nie podano nazwy użytkownika");
  if (!password) return res.status(400).send("Nie podano hasła");

  const exitName = await User.findOne({ name: name });
  if (exitName) return res.status(400).send("Nazwa znajduje już się w bazie");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    password: hashPassword,
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

  if (!name)
    return res
      .status(400)
      .send("Sprawdź, czy adres e-mail i hasło są poprawne");
  if (!password)
    return res
      .status(400)
      .send("Sprawdź, czy adres e-mail i hasło są poprawne");

  const user = await User.findOne({ name: name });
  if (!user)
    return res
      .status(400)
      .send("Sprawdź, czy adres e-mail i hasło są poprawne");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass)
    return res
      .status(400)
      .send("Sprawdź, czy adres e-mail i hasło są poprawne");

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  console.log(token);
  res
    .status(202)

    .cookie("LOGIN_INFO", token, {
      path: "/",
      httpOnly: true,
      secure: true,
    })
    .send(token);
});

module.exports = router;
