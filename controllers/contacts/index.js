const getAllController = require('./getAllController');
const getByIdController = require('./getByIdController');
const createController = require('./createController');
const updateByIdController = require('./updateByIdController');
const updateStatusByIdController = require('./updateStatusByIdController');
const deleteByIdController = require('./deleteByIdController');

module.exports = {
    getAllController, 
    getByIdController, 
    createController, 
    updateByIdController, 
    updateStatusByIdController,
    deleteByIdController,
}