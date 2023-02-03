const {logout} = require('../../services/authService')


const logoutController = async(req, res, next) => {
    try {
        const {_id} = req.user;
        await logout(_id);
        res.status(204).json()
    } catch (error) {
        next(error)
    }
}

module.exports = logoutController;