const {current} = require('../../services/authService')

const currentController = async(req, res, next) => {
    try {
        const token = req.token;
        const {email, subscription} = await current(token);
        res.status(200).json({email, subscription})
    } catch (error) {
        next(error)
    }
}

module.exports = currentController;