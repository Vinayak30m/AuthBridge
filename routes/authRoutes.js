const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { signup, login, logout } = require('../controllers/authController');
const verifyToken = require('../middleware/verifytoken');
const { getUserDetails } = require('../controllers/authController');


router.post(
  '/signup',
  [
    body('name')
      .trim()
      .notEmpty().withMessage('Name is required')
      .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
      .matches(/^[a-zA-Z\s]+$/).withMessage('Name must contain only letters and spaces'),

    body('email')
      .isEmail().withMessage('Enter a valid email'),

    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
      .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character')
  ],
  signup
);
router.post('/login', login);
router.post('/logout', logout);

router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Profile data accessed', user: req.user });
});
router.get('/user/:email', getUserDetails);
module.exports = router; 
