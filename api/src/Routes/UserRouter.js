const express = require("express");
const User = require("../Schemas/User");
const { cryptPassword } = require("../Utils/UserUtils");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ error: "Missing fields" });
  }

  try {
    const savedUser = await User.findOne({ email });

    if (savedUser) {
      return res.status(409).send({ error: "User already exists" });
    }

    const { salt, hash } = await cryptPassword(password);
    const newUser = await User.create({ name, email, password: hash, salt });

    return res.status(201).send({ email: newUser.email, name: newUser.name });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Registration failed" });
  }
});

module.exports = router;
