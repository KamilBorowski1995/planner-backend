const router = require("express").Router();
const nanoid = require("nanoid");
const jwt = require("jsonwebtoken");

const verifityToken = require("./verifityToken");

const User = require("../model/User");

router.post("/add", verifityToken, async (req, res) => {
  const { date, note } = req.body;
  if (!date || !note)
    return res.status(400).send("Prosze uzupełnić wszystkie pola");

  const _id = req.user;

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

  res.send("Notatka dodana");
});

router.post("/edit", verifityToken, async (req, res) => {
  const { date, note, id } = req.body;

  if (!date || !note || !id)
    return res.status(400).send("Prosze uzupełnić wszystkie pola");

  const _id = req.user;

  const user = await User.findOne({ _id: _id });
  if (!user) return res.status(400).send("Błędne dane użytkownika");

  const newArr = user.note.filter((el) => el.id !== id);

  const newNote = {
    id,
    note,
    date,
  };

  await user.set({ note: [...newArr, newNote] }).save();

  res.send("Notatka dodana");
});

router.delete("/delete", verifityToken, async (req, res) => {
  const _idNote = req.body.id;
  if (!_idNote) return res.status(400).send("Prosze uzupełnić wszystkie pola");

  const _id = req.user;

  const user = await User.findOne({ _id: _id });
  if (!user) return res.status(400).send("Błędne dane użytkownika");

  const allNote = user.note;
  const newArr = allNote.filter((el) => el.id !== _idNote);
  await user.set({ note: newArr }).save();
  res.send(user.note);
});
router.get("/notes", verifityToken, async (req, res) => {
  const _id = req.user;

  const user = await User.findOne({ _id: _id });
  if (!user) return res.status(400).send("Błędne dane użytkownika");

  res.send(user.note);
});
router.get("/note", verifityToken, async (req, res) => {
  const _idNote = req.query.id;
  if (!_idNote) return res.status(400).send("Prosze uzupełnić wszystkie pola");

  const _id = req.user;

  const user = await User.findOne({ _id: _id });
  if (!user) return res.status(400).send("Błędne dane użytkownika");
  const newArr = user.note.filter((el) => el.id === _idNote);
  res.send(...newArr);
});

module.exports = router;
