const {Schema, model} = require('mongoose');
const Joi = require("joi");

const schema = new Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model('Contact', schema);

const schemaCreate = Joi.object({
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

  favorite: Joi.boolean(),
})

const schemaPatch = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  Contact, 
  schemaCreate, 
  schemaPatch,
}