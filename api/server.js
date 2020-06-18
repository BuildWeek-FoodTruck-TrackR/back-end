const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


// ROUTES SOURCE
// const operatorRoute = require('./Routes/operator-Route');
// const dinerRouter =  require('./Routes/diner-Route');

// Authenticated Routes 
const operatorAuth = require('../auth/operator-AuthRouter.js')
const dinerAuth = require('../auth/diner-AuthRoute')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// ROUTES
// server.use('/operators', operatorRoute);
// server.use('/diners', dinerRouter);

server.use('/auth/operator', operatorAuth);
server.use('/auth/diner', dinerAuth);

server.get('/', async (req, res) => {
    res.send({ api: 'Welcome to the Api' })
})



module.exports = server;

