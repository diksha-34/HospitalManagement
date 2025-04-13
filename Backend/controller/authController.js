const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { name, email, password} = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashPassword });

    try {
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

        // Send response with the token
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error during user registration:', error);  
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
     
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '1h',
        });
        res.status(200).json({
            message: 'Login successful',
            token: token, 
        });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
