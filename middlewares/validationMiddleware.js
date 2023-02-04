const {ValidationError} = require("../helpers/errors");

const validateRequest = (schema) => {
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        if(error) {
            next(new ValidationError(error.message));
        }
        next();
    }
}

module.exports = {
    validateRequest
}