const { create } = require('../../services/contactsService')

const createController = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const contact = await create(req.body, _id);
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
}

module.exports = createController