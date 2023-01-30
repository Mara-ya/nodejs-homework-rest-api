const { createError } = require('../helpers/errors');
const {
    getAll, 
    getById, 
    create, 
    updateById, 
    updateStatusById,
    deleteById,
} = require('../services/contactsService')

const getAllController = async (req, res, next) => {
    try {
        const contactList = await getAll();
        res.json({contactList});
    } catch (error) {
        next(error);
    }
}

const getByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contactById = await getById(contactId);
        if(!contactById) {
            throw createError(404, "Not found");
        }
        res.json(contactById);
    } catch (error) {
        next(error);
    }
}

const createController = async (req, res, next) => {
    try {
        const contact = await create(req.body);
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
}

const updateByIdController = async (req, res, next) => {
    try {
        const {name, email, phone} = req.body
        const {contactId} = req.params;
        const contact = await updateById(contactId, req.body);

        if (!name && !email && !phone) {
            res.status(400).json({ message: 'missing fields' })
        }
        if (!contact) {
            throw createError(404, "Not found");
        }
        
        res.json(contact);
    } catch (error) {
        next(error);
    }
}

const updateStatusByIdController = async (req, res, next) => {
    try {
        // const {favorite} = req.body
        console.log(req.body)
        const {contactId} = req.params;
        const contact = await updateStatusById(contactId, req.body);

        if (!contact) {
            throw createError(404, "Not found");
        }
        
        res.json(contact);
    } catch (error) {
        next(error);
    }
}

const deleteByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await deleteById(contactId);

        if (!contact) {
            throw createError(404, "Not found");
        }
        res.status(200).json({ message: 'contact deleted' })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllController, 
    getByIdController, 
    createController, 
    updateByIdController, 
    updateStatusByIdController,
    deleteByIdController,
}