const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/secrets');

module.exports = (user) => {
    const payload = {
        userId: user.id,
        username: user.username,
    }

    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, jwtSecret, options)
}