const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization) {
        throw new NotAuthorizedError('Not authorized');
    }

    const [tokenType, token] = authorization.split(' ');
    if (!token || tokenType !== 'Bearer') {
        throw new NotAuthorizedError('Not authorized');
    }
    
    const user = jwt.decode(token, process.env.JWT_SECRET);
    if (!user) {
        throw new NotAuthorizedError('Not authorized');
    }
    req.user = user;
    req.token = token;
    next();
}

module.exports = {
    authMiddleware,
}