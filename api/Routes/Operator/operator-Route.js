const router = require('express').Router();

const Operators = require('../../../models/operator-Model')


// GET REQUEST -> /operators
router.get('/', (req, res) => {

    Operators.findBy()
    .then(operators => {
        res.status(200).json(operators);
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed To Get Operators'})
    })
        

})


// #### GET REQUEST BY ID -> operators/:id #### 
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

// #### UPDATE OPERATOR BY id -> operators/:id ####

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Operators.findById(id)
    .then(operator => {
        if (operator) {
            Operators.update(changes, id)
            .then(updatedOperator => {
                res.json(updatedOperator);
            });
        } else {
            res.status(404).json({ message: 'Could Not Find Operator With The Given Id' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Failed To Update Operator Info."})
    })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Operators.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ Removed: deleted });
        } else {
            res.status(404).json({ message: 'Could Not Find Operator With The Given Id' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Failed To Delete Operator Info."})
    })
})

module.exports = router;