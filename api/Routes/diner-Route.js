const express = require('express')

const router = express.Router();

// const Diners = require('../Model/diner-Model');

router.get("/", async (req, res, next) => {
    try {
      res.status(200).json({ message: "Welcome to the Diner route!" });
    } catch (err) {
      res.status(500).json({
      message: "Something went wrong",
    });
    next(err);
  }
});

module.exports = router;

