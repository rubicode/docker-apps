var jwt = require('jsonwebtoken');
const config = require('../configs/config.json')

class Response {
    constructor(data, success = true) {
        this.success = success
        this.data = data
    }
}

module.exports = {
    tokenValid: (req, res, next) => {
        try {
            const token = req.header('Authorization');
            req.user = jwt.verify(token.slice(7), config.secretKey);
            next()
        } catch (err) {
            res.status(401).json(new Response({ message: 'access denied' }, false))
        }
    },
    Response
}