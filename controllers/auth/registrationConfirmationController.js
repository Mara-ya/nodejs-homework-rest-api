const {registrationConfirmation} = require('../../services/authService')

const registrationConfirmationController = async (req, res) => {
  const {code} = req.params;

  await registrationConfirmation(code);

  res.json({status: 'Verification successful'});
}

module.exports = registrationConfirmationController