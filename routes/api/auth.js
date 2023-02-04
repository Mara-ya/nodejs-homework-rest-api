const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../middlewares/validationMiddleware');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { schemaCreate } = require('../../models/user');
const auth = require('../../controllers/auth/index');

router.post('/signup', validateRequest(schemaCreate), auth.signupController);
router.post('/login', auth.loginController);
router.post('/logout', authMiddleware, auth.logoutController);
router.post('/current', authMiddleware, auth.currentController);

module.exports = router;