const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Fungsi untuk membuat user baru
const createUser = async (req, res) => {
  const { firstName, lastName, dateOfBirth, gender, email, password, role = 'student' } = req.body;

  try {
    // Cek apakah user sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Enkripsi password sebelum menyimpannya
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      password: hashedPassword, // Menyimpan password yang sudah dienkripsi
      role, // Menyimpan role
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
  const { role } = req.query; // Tambahkan filter berdasarkan role jika diperlukan

  try {
    const filter = role ? { role } : {};
    const users = await User.find(filter);
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
  const { firstName, lastName, dateOfBirth, gender, email, password, role } = req.body;

  try {
    // Enkripsi password jika ada perubahan password
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedFields = {
      firstName,
      lastName,
      dateOfBirth,
      gender,
      email,
      password: hashedPassword || undefined,
      ...(role && { role }), // Hanya memperbarui role jika ada dalam request body
    };

    const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });

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
    // Misalnya hanya admin yang boleh menghapus
    const requestingUser = req.user; // Anggap user terautentikasi tersedia di `req.user`
    if (requestingUser.role !== 'admin') {
      return res.status(403).json({ msg: 'Forbidden: Admin access required' });
    }

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
