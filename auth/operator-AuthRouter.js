const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('./generateToken');

const Operators = require('../models/operator-Model');



// ### POST -> REGISTER OPERATOR ###

router.post('/register', (req, res) => {
    const operator = req.body

    // saves password as a hash in db
    const hash = bcrypt.hashSync(operator.password, 8)
    operator.password = hash

    // Generates token once user registers
    const token = generateToken(operator)

    Operators.add(operator)
        .then(saved => {
            res.status(201).json({ message: "Operator Registration Successful.", id: saved.id, username: saved.username, token: token})
        })
        .catch(err => {
        res.status(500).json({ message: 'There was an error saving this user to the database', err })
    
    }) 
    
});


// ### POST -> LOGIN OPERATOR ###

router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    Operators.findBy({ username })
      .first()
      .then((operator) => {
        if (operator && bcrypt.compareSync(password, operator.password)) {

          // Generates token once user logins
          const token = generateToken(operator)
  
          res.status(200).json({
            message: `Welcome to FoodTruck Trackr`, operator_id:operator.id,
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