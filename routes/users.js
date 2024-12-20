const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');

const router = express.Router();

// Route: Register a new user
router.post('/register', registerUser);

// Route: Login an existing user
router.post('/login', loginUser);

module.exports = router;
