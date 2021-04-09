const router = require("express").Router();
const nanoid = require("nanoid");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

router.post("/add", async (req, res) => {
  const { date, note } = req.body;

  console.log(date);
  console.log(note);

  if (!req.cookies.LOGIN_INFO) return res.status(400).send("UserErr");
  if (!date || !note)
    return res.status(400).send("Prosze uzupełnić wszystkie pola");

  const decodeToken = jwt.decode(req.cookies.LOGIN_INFO);

  const _id = decodeToken._id;

  console.log(_id);

  const user = await User.findOne({ _id: _id });
  if (!user) return res.status(400).send("Błędne dane użytkownika");

  const newID = await nanoid.nanoid();

  const allNote = user.note;

  const newNote = {
    id: newID,
    note: note,
    date: date,
  };

  await user.set({ note: [...allNote, newNote] }).save();

  res.send(_id);
});

module.exports = router;
