const { getAll } = require('../../services/contactsService')

const getAllController = async (req, res) => {
    const { _id } = req.user;
    const contactList = await getAll(_id);
    res.json({contactList});
}

module.exports = getAllController;