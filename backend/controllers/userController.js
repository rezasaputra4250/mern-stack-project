const User = require('../models/User');

// Fungsi untuk membuat user baru
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password,  // Pertimbangkan untuk mengenkripsi password sebelum menyimpannya
    });

    await newUser.save();
    res.status(201).json({ msg: 'User created successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Fungsi untuk mendapatkan semua users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Fungsi untuk mendapatkan user berdasarkan ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Fungsi untuk memperbarui user berdasarkan ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, password }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Fungsi untuk menghapus user berdasarkan ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
