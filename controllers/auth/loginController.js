const {login} = require('../../services/authService')

const loginController = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await login(email, password);
        res.json(user)
    } catch (error) {
        next(error)
    }
}

module.exports = loginController;