const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../middlewares/validationMiddlewares');
const { schemaCreate, schemaPatch } = require('../../models/contact');
const {
  getAllController, 
  getByIdController, 
  createController, 
  updateByIdController, 
  updateStatusByIdController,
  deleteByIdController,
} = require('../../controllers/contactsController');


router.get('/', getAllController);
router.get('/:contactId', getByIdController);
router.post('/', validateRequest(schemaCreate), createController);
router.put('/:contactId', updateByIdController);
router.patch('/:contactId/favorite', validateRequest(schemaPatch), updateStatusByIdController);
router.delete('/:contactId', deleteByIdController);

module.exports = router;