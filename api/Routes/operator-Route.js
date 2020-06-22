const router = require('express').Router();

const Operators = require('../../models/operator-Model')


router.get('/', (req, res) => {

    try {
        res.status(200).json({ message: "Welcome to the Operator Route" });
    } catch (err) {
        next(err);
    }

})

// #### GET BY ID #### 
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Operators.findById(id)
    .then(operator => {
        if (operator) {
            res.status(200).json(operator)
        } else {
            res.status(404).json({ message: 'Could not find operator with the given id.' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get the operators.' })
    })

})

module.exports = router;