const express = require('express')
const cors = require('cors')
const helmet = require('helmet')


// ROUTES SOURCE
const operatorRoute = require('./Routes/operator/operator-Route');
const dinerRouter =  require('./Routes/diner/diner-Route');


const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

// ROUTES
// server.use('/operators', operatorRoute);
// server.use('/diners', dinerRouter);



server.get('/', async (req, res) => {
    res.send({ api: 'Welcome to the Api' })
})



module.exports = server;

