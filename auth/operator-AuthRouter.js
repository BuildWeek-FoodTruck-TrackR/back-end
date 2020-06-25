const router = require('express').Router();
const bcrypt = require('bcryptjs');
const generateToken = require('./generateToken');

const Operators = require('../models/operator-Model');



// ### POST -> REGISTER OPERATOR ###

router.post('/register', (req, res) => {
    const { username, password } = req.body


    // saves password as a hash in db
    const hash = bcrypt.hashSync(password, 8)
    const operator = {username: username, password:hash} 

    // Generates token once user registers
    const token = generateToken(operator)

    Operators.add(operator)
        .then(saved => {
            res.status(201).json({ message: "Operator Registration Successful.", operator:operator, id: saved.id, token: token})
        })
        .catch(err => {
        res.status(500).json({ message: 'There was an error saving this user to the database', err })
    
    }) 
    
});


// ### POST -> LOGIN OPERATOR ###

// router.post('/login', (req, res) => {
//     const { username, password } = req.body;
  
//     Operators.findBy({ username })
//       .then((operator) => {
//         if (operator && bcrypt.compareSync(password, operator.password)) {

//           // Generates token once user logins
//           const token = generateToken(operator)
  
//           res.status(200).json({
//             message: `Welcome ${operator.username}`, id: operator.id,
//             token
//           })
//         } else {
//           res.status(401).json({ message: 'Invalid Credentials' })
//         }
//       })
//       .catch(err => {
//         res.status(500).json({ message: 'There was an error logging in', err });
//       });
// });

router.post('/login', (req, res) => {
	const { username, password } = req.body
	if (req.body) {
		Operators.findBy({ username: username })
			.then((operator) => {
				// compare the password the hash stored in the database
				if (operator && bcryptjs.compareSync(password, operator.password)) {
					const token = generateToken(operator)
					res.status(200).json({ message: 'Welcome to our API', id:operator.id, token: token })
				} else {
					res.status(401).json({ message: 'Invalid credentials' })
				}
			})
			.catch((error) => {
				res.status(500).json({ error: 'You were unable to get info from the database!' })
			})
	} else {
		res.status(400).json({
			message: 'please provide email and password',
		})
	}
})



module.exports = router;