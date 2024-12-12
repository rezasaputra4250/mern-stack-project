const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose'); // Tambahkan impor mongoose
const User = require('../models/User'); // Import model User

// Fungsi untuk membuat data palsu
const generateFakeUser = () => {
  return {
    name: faker.person.fullName(), // Ganti dengan faker.person.fullName
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

// Fungsi untuk melakukan seeding data
const seedUsers = async () => {
  try {
    // Hapus data lama sebelum menambahkan data baru (opsional)
    await User.deleteMany({});

    // Generate 10 data pengguna palsu
    const fakeUsers = Array.from({ length: 10 }, generateFakeUser);

    // Sisipkan data palsu ke koleksi User
    await User.insertMany(fakeUsers);

    console.log('Users have been successfully seeded');
    mongoose.disconnect(); // Pastikan mongoose.disconnect ada di sini setelah seeding selesai
  } catch (error) {
    console.error('Error seeding users:', error);
    mongoose.disconnect();
  }
};

module.exports = seedUsers;
