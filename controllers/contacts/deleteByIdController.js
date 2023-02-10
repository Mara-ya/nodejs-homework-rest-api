const { deleteById } = require('../../services/contactsService')

const deleteByIdController = async (req, res) => {
    const { contactId } = req.params;
    const { _id } = req.user
    await deleteById(contactId, _id);
    res.status(200).json({ message: 'contact deleted' });
}

module.exports = deleteByIdController;