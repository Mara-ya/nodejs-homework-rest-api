const {current} = require('../../services/authService')

const currentController = async(req, res) => {
    const token = req.token;
    const {email, subscription} = await current(token);
    res.status(200).json({email, subscription});
}

module.exports = currentController;