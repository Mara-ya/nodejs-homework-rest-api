const {signup} = require('../../services/authService')

const signupController = async(req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await signup(email, password);
        res.status(200).json({user: user});
    } catch (error) {
        next(error)
    }
}

module.exports = signupController;