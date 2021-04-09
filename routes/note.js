const router = require("express").Router();
const nanoid = require("nanoid");

const User = require("../model/User");

router.post("/add", async (req, res) => {
  const { _id, date, note } = req.body;

  if (!_id || !date || !note)
    return res.status(400).send("Prosze uzupełnić wszystkie pola");

  const user = await User.findOne({ _id: _id });
  if (!user) return res.status(400).send("Błędne dane użytkownika");

  const nazwisko = "no elo moje n";

  // await user.updateOne({ $set: { name: "admin" } });

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
