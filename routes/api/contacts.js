const express = require('express')
const contacts = require('../../models/contacts')
const Joi = require('joi')
const { createError } = require('../../errors');

const router = express.Router()

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  email: Joi.string()
    .email(),

  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
})

router.get('/', async (req, res, next) => {
  try {
    const listContacts = await contacts.listContacts()
    res.json({ listContacts })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contactById = await contacts.getContactById(contactId)
    if(!contactById) {
      throw createError(404, "Not found")
    }
    res.json({ contact: contactById })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body)
    const {name, email, phone} = req.body
    const contact = await contacts.addContact(name, email, phone)

    if(error) {
      throw createError(400, error.message)
    }

    res.status(201).json(contact);
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await contacts.removeContact(contactId)
    if (!contact) {
      throw createError(404, "Not found");
    }
    res.status(204).json(contact);
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const body = req.body
    const { error } = schema.validate(req.body);

    if (error) {
      throw createError(400, error.message);
    }

    const {contactId} = req.params
    const contact = await contacts.updateContact(contactId, body)
    if (!contact) {
      throw createError(404, "Not found");
    }

    res.json(contact);
  } catch (error) {
    next(error)
  }
})

module.exports = router