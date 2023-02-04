const { BadRequest } = require('../../helpers/errors');
const { updateById } = require('../../services/contactsService')

const updateByIdController = async (req, res) => {
    try {
        const {name, email, phone} = req.body
        if (!name && !email && !phone) {
            res.status(400).json({ message: 'missing fields' })
        }
        
        const { _id } = req.user
        const {contactId} = req.params;
        const contact = await updateById(contactId, req.body, _id);
        res.json(contact);
    } catch (error) {
        throw new BadRequest("Not found id");
    }
}

module.exports = updateByIdController;