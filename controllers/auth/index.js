const signupController = require('./signupController');
const registrationConfirmationController = require('./registrationConfirmationController');
const reSendVerificationTokenController = require('./reSendVerificationTokenController');
const loginController = require('./loginController');
const logoutController = require('./logoutController');
const currentController = require('./currentController');
const avatarController = require('./avatarController');

module.exports = {
    signupController,
    registrationConfirmationController,
    reSendVerificationTokenController,
    loginController,
    logoutController,
    currentController,
    avatarController,
};