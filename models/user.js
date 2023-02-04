const {Schema, model} = require('mongoose');
const Joi = require("joi");
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
});

userSchema.pre('save', async function () {
    if(this.isNew){
        this.password = await bcrypt.hash(this.password, 10)
    }
})

const User = model('User', userSchema);

const schemaCreate = Joi.object({
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    .min(5)
    .required(),

    email: Joi.string()
    .email(),

    subscription: Joi
    .any()
    .valid('starter', 'pro', 'business'),

    token: Joi.string(),
})

const schemaPatch = Joi.object({
  favorite: Joi.bool().required(),
});

module.exports = {
  User, 
  schemaCreate, 
  // schemaPatch
}