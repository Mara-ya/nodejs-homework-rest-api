const fs = require('fs').promises
const path = require('path')

const contactsPath = path.resolve('models/contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactsPath)
  const contacts = JSON.parse(data.toString())
  return contacts
}

const getContactById = async (contactId) => {
  const contacts = await listContacts()
  const contactById = contacts.find(contact => contact.id === contactId)
  return contactById ? contactById : null
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const necessaryId = contacts.findIndex(contact => contact.id === contactId)

  if(necessaryId !== -1) {
    const remainingContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(remainingContacts))
    return contacts[necessaryId]
  } else {
    return null
  }
}

const addContact = async (name, email, phone) => {
  const contacts = await listContacts()
  let duplicate = false;

  contacts.map(({email: existingEmail, phone: existingPhone}) => {
    if (existingEmail === email || existingPhone === phone){
      duplicate = true;
    }
  })

  if (!duplicate) {
    const newId = String(Number(contacts[contacts.length - 1].id) + 1);
    const newContact = {
      id: newId,
      name,
      email,
      phone: String(phone),
    };
    const newContactsList = [...contacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(newContactsList))
  }
}

const updateContact = async (contactId, {name, email, phone}) => {
  const contacts = await listContacts()
  const necessaryContactId = contacts.findIndex(contact => contact.id === contactId)

  if(necessaryContactId !== -1) {
    contacts[necessaryContactId].name = name;
    contacts[necessaryContactId].email = email;
    contacts[necessaryContactId].phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(contacts))
    return (contacts[necessaryContactId])
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
