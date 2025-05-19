const db = require('../db');

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  db.query("INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password],
    (err, result) => {
      console.log(err);
      if (err) return res.status(500).json(err);
      res.json({ message: "User registered" });
    });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, results) => {
      console.log(err);
      if (err) return res.status(500).json(err);
      if (results.length > 0) res.json({ message: "Login successful" });
      else res.status(401).json({ message: "Invalid credentials" });
    });
};
