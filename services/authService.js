const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const { User } = require('../models/user');
const { NotAuthorizedError, RegistrationConflictError, BadRequest } = require('../helpers/errors');

const signup = async (email, password, avatarURL, verificationToken) => {
    try {
        const user = new User({
            email, 
            password,
            avatarURL,
            verificationToken
        });

        await user.save();
        
        const msg = {
            to: email,
            from: 'mariya18.99.08@gmail.com',
            subject: 'Please, confirm your email',
            text: `Please, confirm your email address GET http://localhost:3000/api/users/verify/${verificationToken}`,
            html: `Please, confirm your email address GET http://localhost:3000/api/users/verify/${verificationToken}`,
        };
        
        await sgMail.send(msg);
        
        return {
            email: user.email, 
            subscription: user.subscription,
        }
    } catch (error) {
        throw new RegistrationConflictError('Email in use');
    }
}

const registrationConfirmation = async(code) => {
    try {
        const user = await User.findOne({
            code,
            verify: false
        });
        
        if (!user) {
            throw new NotAuthorizedError('User not found');
        }
        
        user.verify = true;
        await user.save();
        
        const msg = {
            to: user.email,
            from: 'mariya18.99.08@gmail.com',
            subject: 'Thank you for registration!',
            text: 'Thank you for registration!',
            html: '<strong>Thank you for registration!</strong>',
        };
        
        await sgMail.send(msg);
    } catch (error) {
        console.log(error)
    }
    
}

const reSendVerificationToken = async(email) => {
    const {verificationToken, verify} = await User.findOne({email});

    if (!verificationToken) {
        throw new BadRequest('missing required field email');
    }

    if (verify) {
        throw new BadRequest('Verification has already been passed');
    }

    const msg = {
        to: email,
        from: 'mariya18.99.08@gmail.com',
        subject: 'Please, confirm your email',
        text: `Please, confirm your email address GET http://localhost:3000/api/users/verify/${verificationToken}`,
        html: `Please, confirm your email address GET http://localhost:3000/api/users/verify/${verificationToken}`,
    };
    
    await sgMail.send(msg);
}

const login = async (email, password) => {
    const {_id, password: userPasword, subscription, verify} = await User.findOne({email});
    if(!email || !password){
        throw new NotAuthorizedError('Email or password is wrong');
    }
    
    if(!verify){
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
    registrationConfirmation,
    reSendVerificationToken,
    login,
    logout,
    current,
    updateUser,
}