const express = require('express');
const router = new express.Router();
const path = require('path');

const { validateRequest } = require('../../middlewares/validationMiddleware');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const avatarMiddleware = require('../../middlewares/avatarMiddleware');
const { schemaCreate } = require('../../models/user');
const auth = require('../../controllers/auth/index');
const { asyncWrapper } = require('../../helpers/apiHelpers');

const PUBLIC_DIR = path.resolve('./public/avatars');

router.use('/avatars', express.static(PUBLIC_DIR));

router.post('/signup', validateRequest(schemaCreate), asyncWrapper(auth.signupController));
router.post('/login', asyncWrapper(auth.loginController));
router.post('/logout', authMiddleware, asyncWrapper(auth.logoutController));
router.post('/current', authMiddleware, asyncWrapper(auth.currentController));
router.patch('/avatars', authMiddleware, avatarMiddleware.single('avatar'), asyncWrapper(auth.avatarController));

module.exports = router;