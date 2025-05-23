const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/products', (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;
