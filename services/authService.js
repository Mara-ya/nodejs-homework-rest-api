const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const { NotAuthorizedError, RegistrationConflictError } = require('../helpers/errors');

const signup = async (email, password, avatarURL) => {
    try {
        console.log(password)
        const user = new User({
            email, 
            password,
            avatarURL
        });

        await user.save();

        return {
            email: user.email, 
            subscription: user.subscription,
        }
    } catch (error) {
        throw new RegistrationConflictError(`Email in use`);
    }
}

const login = async (email, password) => {
    const {_id, password: userPasword, subscription} = await User.findOne({email});
    if(!email && !password){
        throw new NotAuthorizedError('Email or password is wrong');
    }

    const matching = await bcrypt.compare(password, userPasword);
    if(!matching){
        throw new NotAuthorizedError(`Email or password is wrong`);
    }

    const token = jwt.sign({_id}, process.env.JWT_SECRET);
    await User.findByIdAndUpdate(_id, {token})

    return {
        token,
        user: {
            email,
            subscription,
        }
    };
}

const logout = async (_id) => {
    await User.findByIdAndUpdate(_id, {token: null})
}

const current = async (token) => {
    const [user] = await User.find({token})
    return user
}

const updateUser = async (id, data) => {
    return User.findByIdAndUpdate(id, data, {new: true});
}

module.exports = {
    signup,
    login,
    logout,
    current,
    updateUser
}