require('dotenv').config(); // Memuat variabel lingkungan dari .env
const mongoose = require('mongoose'); // Impor mongoose
const { faker } = require('@faker-js/faker'); // Impor faker
const User = require('../models/User'); // Impor model User

// Fungsi untuk membuat data palsu
const generateFakeUser = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: faker.date.past(30), // Umur antara 0-30 tahun
    gender: faker.helpers.arrayElement(['male', 'female', 'other']),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
};

// Fungsi untuk melakukan seeding data
const seedUsers = async () => {
  try {
    // Koneksi ke MongoDB menggunakan variabel dari .env
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Connected to MongoDB');

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

seedUsers(); // Jalankan fungsi seedUsers

module.exports = seedUsers;
