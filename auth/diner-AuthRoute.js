const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('./generateToken');
const Diners = require('../models/diner-Model');

// ### POST -> REGISTER DINER ###
router.post('/register', (req, res) => {
    let diner = req.body

    // saves password as a hash in db
    const hash = bcrypt.hashSync(diner.password, 8)
    diner.password = hash

    // Generates token once user registers
    const token = generateToken(diner);

    Diners.add(diner)
        .then(saved => {
            res.status(201).json({ message: "Diner Registration Successful.", id: saved.id, username: saved.username, token: token})
        })
        .catch(err => {
        res.status(500).json({ message: 'There was an error saving this user to the database', err })
    })
    
    
});

// POST -> LOGIN DINER
router.post('/login', (req, res) => {
    const { username, password } = req.body
  
    Diners.findBy({ username })
      .first()
      .then(diner => {
        if (diner && bcrypt.compareSync(password, diner.password)) {

          // Generates token once user logins
          const token = generateToken(diner)
  
          res.status(200).json({
            message: `Welcome ${diner.username}`, id: diner.id,
            token
          })
        } else {
          res.status(401).json({ message: 'Invalid Credentials' })
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'There was an error logging in', err });
      });
});

module.exports = router;