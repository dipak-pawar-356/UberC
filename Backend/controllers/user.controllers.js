const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blackListToken.model');


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }


    console.log(req.body);


    const { fullname, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({ email});

    if(isUserAlreadyExist){
        return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user});


}



module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = await userModel.findOne({email}).select('+password');

    if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await userModel.comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }


    const token = user.generateAuthToken();

    res.cookie('token', token);


    res.status(200).json({ token, user });



}


module.exports.getUserProfile = async (req, res, next) => {

    const user = await userModel.findById(req.user._id).select('-password');
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
}


module.exports.logoutUser = async (req, res, next) => {

    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];

    await blacklistTokenModel.create({ token });

    res.status(200).json({ message: 'Logged out successfully' });
}