const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.post("/register", (req, res) => {
  if (!req.body.name)
    return res.status(400).send("Nie podano nazwy użytkownika");
  if (!req.body.email) return res.status(400).send("Nie podano maila");
  if (!req.body.password) return res.status(400).send("Nie podano hasła");

  res.send("no i elo");
});

module.exports = router;
