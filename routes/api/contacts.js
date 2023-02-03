const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../middlewares/validationMiddleware');
const { schemaCreate, schemaPatch } = require('../../models/contact');
const contacts = require('../../controllers/contacts/index');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const { authMiddleware } = require('../../middlewares/authMiddleware');

router.use(authMiddleware)
router.get('/', asyncWrapper(contacts.getAllController));
router.get('/:contactId', asyncWrapper(contacts.getByIdController));
router.post('/', validateRequest(schemaCreate), contacts.createController);
router.put('/:contactId', asyncWrapper(contacts.updateByIdController));
router.patch('/:contactId/favorite', validateRequest(schemaPatch), contacts.updateStatusByIdController);
router.delete('/:contactId', asyncWrapper(contacts.deleteByIdController));

module.exports = router;