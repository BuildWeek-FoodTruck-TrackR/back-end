const router = require('express').Router();

const Trucks = require('../../models/trucks-Model')


// GET ALL TRUCKS REQUEST -> /trucks
router.get('/', (req, res) => {

    Trucks.findAll()
    .then(truck => {
        res.status(200).json(truck);
    })
    .catch (err => {
        res.status(500).json({ message: 'Failed To Get Trucks'})
    })
        

})


// #### POST NEW TRUCK -> /trucks
router.post('/', (req, res) => {
    const truck = req.body
 
    Trucks.add(truck)
    .then (addTruck => {
        res.status(201).json(addTruck)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to create a new Truck' });
    })
})


// #### GET REQUEST BY Trucks ID -> trucks/:id #### 
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Trucks.findBy(id)
    .then(trucks => {
        if (trucks) {
            res.status(200).json(trucks)
        } else {
            res.status(404).json({ message: 'Could not find truck with the given id.' })
        }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get the Truck.' })
    })

})

// #### UPDATE TRUCKS BY id -> trucks/:id ####

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Trucks.findById(id)
    .then(truck => {
        if (truck) {
            Trucks.update(changes, id)
            .then(updatedTruck => {
                res.json(updatedTruck);
            });
        } else {
            res.status(404).json({ message: 'Could Not Find Truck With The Given Id' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Failed To Update Truck Info."})
    })
})

// #### DELETE TRUCKS OBJECT by id -> trucks/:id ####

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Trucks.remove(id)
    .then(deleted => {
        if (deleted) {
            res.json({ Removed: deleted });
        } else {
            res.status(404).json({ message: 'Could Not Find Truck With The Given Id' });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Failed To Delete Truck Info."})
    })
})

module.exports = router;