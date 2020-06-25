const router = require('express').Router();

const Operators = require('../../../models/operator-Model')
const Trucks = require('../../../models/trucks-Model')
const Menu = require('../../../models/menu-Model')

const db = require('../../../database/dbConfig.js')


// GET REQUEST -> /operators
router.get('/', (req, res) => {

    Operators.findAll()
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

// #### GET OPERATOR TRUCKS ####
router.get('/:id/trucks', (req, res) => {
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

// #### DELETE OPERATOR OBJECT by id -> operators/:id ####

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


// #### CREATE NEW TRUCK  ####
router.post('/trucks', (req, res) => {

    const truck = req.body
 
    Trucks.add(truck)
    .then (addTruck => {
        res.status(201).json(addTruck)
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to create a new Truck' });
    })
})

//  #### GET OPERATOR TRUCK BY THEIR ID ####
router.get("/:id/trucks/:truck_id", async (req, res, next) => {
      try {
        const truck = await db("trucks")
          .where("operator_id", req.params.id)
          .andWhere("id", req.params.truck_id)
          .first();
  
        if (!truck) {
          return res.status(404).json({
            message: "Truck not found",
          });
        }
  
        res.json(truck);
      } catch (err) {
        next(err);
      }
});

// #### UPDATE TRUCK BY THEIR ID
//check route
router.put("/:id/trucks/:truck_id", async (req, res) => {
    try {
      await db("trucks")
        .where("id", req.params.truck_id)
        .andWhere("operator_id", req.params.id)
        .update(req.body);
      const truck = await db("trucks").wher("id", req.params.truck_id).first();

      res.json(truck);
    } catch (err) {
      
    }
});

// #### DELETE TRUCK #
router.delete("/:id/trucks/:truck_id", async (req, res) => {
      try {
        await db("trucks")
          .where("id", req.params.truck_id)
          .andWhere("operator_id", req.params.id)
          .del();
  
        res.status(201).json({
          message: `Truck ${req.params.truck_id} deleted`,
        });
      } catch (err) {
        next(err);
      }
});

// ### POST MENU to TRUCK #### -> operators/trucks/menu
// add truck_id in the body 
router.post("/trucks/menu", async (req, res, next) => {
    try {
      const [id] = await db("menu_items").insert(req.body);
      const menu = await db("menu_items").where({ id }).first();
  
      res.status(201).json(menu);
    } catch (err) {
      next(err);
    }
});

// GET MENU ITEMS BY THEIR ID -> operators/trucks/:id/menu/:item_id
router.get("/trucks/:id/menu/:item_id", async (req, res, next) => {
    try {
      const menuItem = await db("menu_items").where("id", req.params.item_id).first();
  
      if (!menuItem) {
        return res.status(404).json({
          message: "Menu item not found",
        });
      }
  
      res.json(menuItem);
    } catch (err) {
      next(err);
    }
});


// ### DELETE MENU ITEM
router.delete('/:operatorId/truck/:truckId/delete/:itemId', (req, res) => {
    const { operatorId, truckId, itemId } = req.params;

    Menu.removeMenuItem(itemId)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: 'unable to remove item from menu' });
        })
})

module.exports = router;