const { UnauthenticatedError } = require("../errors");
const jwt = require('jsonwebtoken')
// retrieve Secret Ket
const secret = process.env.JWT_SECRET




const authenticationMiddleware =  async(req, res, next) => {
    
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('No token provided')
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, secret);
        const { id, username } = decoded
        req.user = { id, username }
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorised to access this route')
    }   
    
}

module.exports = authenticationMiddleware;