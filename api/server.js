const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


// ROUTES SOURCE
const operatorRoute = require('./Routes/Operator/operator-Route');
const dinerRouter =  require('./Routes/Diner/diner-Route');
const truckRouter = require('./Routes/trucks-Route')

// Authenticated Routes 
const operatorAuth = require('../auth/operator-AuthRouter.js')
const dinerAuth = require('../auth/diner-AuthRoute')

// Authenticated Middleware
const Restricted = require('../auth/auth-Middleware')

const server = express();


server.use(helmet());
server.use(cors());
server.use(express.json());

// ROUTES for Admin
server.use('/operators', Restricted, operatorRoute);
server.use('/diners', Restricted, dinerRouter);
server.use('/trucks', Restricted, truckRouter)

// Authenticated Login for Operators and Client(Diners)
server.use('/auth/operator', operatorAuth);
server.use('/auth/diner', dinerAuth);

server.get('/', async (req, res) => {
    res.json({ api: 'Welcome to the Api' })
})



module.exports = server;

