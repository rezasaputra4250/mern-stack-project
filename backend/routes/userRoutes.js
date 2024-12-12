const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');

const router = express.Router();

// Define routes
router.post('/', createUser);  // POST /api/users (create a user)
router.get('/', getUsers);     // GET /api/users (get all users)

module.exports = router;
