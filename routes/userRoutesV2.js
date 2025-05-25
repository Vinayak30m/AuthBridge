const express = require('express');
const router = express.Router();
const { signup, getUsers, login } = require('../controllers/userControllerV2');

router.post('/signup', signup);
router.post('/login', login);  
router.get('/users', getUsers);

module.exports = router;

