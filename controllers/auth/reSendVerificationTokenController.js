const {reSendVerificationToken} = require('../../services/authService')

const reSendVerificationTokenController = async(req, res) => {
    const {email} = req.body;
    await reSendVerificationToken(email);
    res.status(200).json({message: 'Verification email sent'});
}

module.exports = reSendVerificationTokenController;