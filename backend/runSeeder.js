require('dotenv').config(); // Memuat variabel lingkungan dari .env

const mongoose = require('mongoose');
const seedUsers = require('./seeders/userSeeder');

// Koneksi ke MongoDB menggunakan variabel dari .env
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    seedUsers(); // Jalankan seeder
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
