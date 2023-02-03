const { Contact } = require('../models/contact');

const getAll = async (owner) => {
    return Contact.find({owner});
}

const getById = async (_id, owner) => {
    return Contact.findOne({_id, owner})
}

const create = async (contact, owner) => {
    const newContact = new Contact({...contact, owner})
    const savedContact = await newContact.save();
    return savedContact;
}

const updateById = async (_id, contact, owner) => {
    return Contact.findOneAndUpdate({_id, owner}, contact, { new: true });
}

const updateStatusById = async (_id, contact, owner) => {
    return Contact.findOneAndUpdate({_id, owner}, contact, { new: true });
}

const deleteById = async (_id, owner) => {
    return await Contact.findOneAndRemove({_id, owner});
}

module.exports = {
    getAll, 
    getById, 
    create, 
    updateById, 
    updateStatusById,
    deleteById,
}