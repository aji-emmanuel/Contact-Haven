const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next){
    const jwtSecret = config.get('jwtSecret');
    // get token from header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token){
        return res.status(401).json({message: "No token. Authorization denied!"});
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user;
        next();
    } catch (error) {
            return res.status(401).json({message: "Invalid token. Authorization denied!"});
    }
}