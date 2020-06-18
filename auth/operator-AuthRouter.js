const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('./generateToken');

const Operators = require('../models/operator-Model');



// ### POST -> REGISTER OPERATOR ###
router.post('/register', (req, res) => {
    const operator = req.body
    const hash = bcrypt.hashSync(operator.password, 8)
    operator.password = hash

    Operators.add(operator)
        .then(saved => {
            res.status(201).json({ message: "Operator Registration Successful.", id: saved.id, username: saved.username})
        })
        .catch(err => {
        res.status(500).json({ message: 'There was an error saving this user to the database', err })
    
    }) 
    
});



// ### POST -> LOGIN OPERATOR ###

router.post('/login', (req, res) => {
    const { username, password } = req.body
  
    Operators.find({ username })
      .first()
      .then(operator => {
        if (operator && bcrypt.compareSync(password, operator.password)) {
          const token = generateToken(operator)
  
          res.status(200).json({
            message: `Welcome ${operator.username}`,
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