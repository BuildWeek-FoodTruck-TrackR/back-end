const server = require('./api/server')

const dotenv = require('dotenv')
dotenv.config();

const PORT = process.env.PORT || 5555;

server.listen(PORT, () => {
    console.log(`\n=== Server Listening on Port ${PORT}...===\n`);
    
})