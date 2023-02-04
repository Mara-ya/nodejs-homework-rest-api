const { BadRequest } = require('../../helpers/errors');
const { updateStatusById } = require('../../services/contactsService')

const updateStatusByIdController = async (req, res, next) => {
    try {
        const { _id } = req.user
        const {contactId} = req.params;
        const contact = await updateStatusById(contactId, req.body, _id);

        if (!contact) {
            throw new BadRequest("Not found id");
        }
        
        res.json(contact);
    } catch (error) {
        next(error);
    }
}

module.exports = updateStatusByIdController;