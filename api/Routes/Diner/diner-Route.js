const express = require('express')

const router = express.Router();

const Diners = require('../../../models/diner-Model');


// GET REQUEST -> /diners
router.get('/', (req, res) => {

  Diners.findBy()
  .then(diners => {
      res.status(200).json(diners);
  })
  .catch (err => {
      res.status(500).json({ message: 'Failed To Get Diners'})
  })
      

})

// #### GET REQUEST BY ID -> diners/:id #### 
router.get('/:id', (req, res) => {
  const { id } = req.params;

  Diners.findById(id)
  .then(diner => {
      if (diner) {
          res.status(200).json(diner)
      } else {
          res.status(404).json({ message: 'Could not find Diner with the given id.' })
      }
  })
  .catch(err => {
      res.status(500).json({ message: 'Failed to get the Diner.' })
  })

})

// #### UPDATE DINER BY id -> diners/:id ####


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Diners.findById(id)
  .then(diner => {
      if (diner) {
          Diners.update(changes, id)
          .then(updatedDiner => {
              res.json(updatedDiner);
          });
      } else {
          res.status(404).json({ message: 'Could Not Find Diner With The Given Id' });
      }
  })
  .catch(err => {
      res.status(500).json({ message: "Failed To Update Diner Info."})
  })
})

// #### DELETE DINER OBJECT by id -> diners/:id ####

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Diners.remove(id)
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

