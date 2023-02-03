const { BadRequest } = require('../../helpers/errors');
const { getById } = require('../../services/contactsService')

const getByIdController = async (req, res) => {
    const { contactId } = req.params;
    const { _id } = req.user
    const contactById = await getById(contactId, _id);
    if(!contactById) {
        throw new BadRequest("Not found id");
    }
    res.json(contactById);
}

module.exports = getByIdController;