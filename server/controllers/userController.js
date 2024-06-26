import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import asyncHandler from 'express-async-handler';
import dotenv from 'dotenv';

dotenv.config();



// @desc    Register a user
// @route   POST /api/users
// @access  Public


const registerUser = asyncHandler(async (req, res) => {
 
  const {name, email, password} = req.body;
  
  try {

  if (!name || !email || !password) {
    res.status(400)
    throw new Error('Please add all fields')
  }
  

// check if user exists
const userExists = await User.findOne({ email })

if (userExists) {
  res.status(400)
  throw new Error('User already exists')
}

// hash password
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password, salt)


// create user
const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

if (user) {
  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
} else {
  res.status(400)
  throw new Error('Invalid user data')
}

} catch (error) {
  res.status(400).json({ message: error.message });
}
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user
    const user = await User.findOne({email});

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }

    else {
      res.status(400);
      throw new Error('Invalid credentials');
    }
  });


// @desc    Get user data
// @route   GET /api/users(me)
// @access  Public



  const getMe = asyncHandler(async (req, res) => {
    res.json({message: "User data"});
    res.status(200).json(req.user)
  });

  // Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

  

export { registerUser,
    loginUser,
    getMe};
