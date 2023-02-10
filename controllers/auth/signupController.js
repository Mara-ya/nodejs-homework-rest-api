var gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');
const {signup} = require('../../services/authService');

const signupController = async(req, res) => {
    const {email, password} = req.body;
    const avatar = gravatar.url(email, {protocol: 'https'});
    const code = uuidv4();
    const user = await signup(email, password, avatar, code);
    res.status(200).json({user: user});
}

module.exports = signupController;