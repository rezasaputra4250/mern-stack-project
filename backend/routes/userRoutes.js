const express = require('express');
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Rute untuk membuat user baru (POST)
router.post('/', createUser);

// Rute untuk mendapatkan semua users (GET)
router.get('/', getUsers);

// Rute untuk mendapatkan user berdasarkan ID (GET)
router.get('/:id', getUserById);

// Rute untuk memperbarui user berdasarkan ID (PUT)
router.put('/:id', updateUser);

// Rute untuk menghapus user berdasarkan ID (DELETE)
router.delete('/:id', deleteUser);

module.exports = router;
