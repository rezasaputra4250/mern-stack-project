require('dotenv').config(); // Memuat variabel lingkungan dari .env

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Mengatur agar strictQuery menjadi false untuk menghindari peringatan pada Mongoose
mongoose.set('strictQuery', false);

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke MongoDB menggunakan variabel dari .env
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Keluar dari aplikasi jika gagal koneksi ke MongoDB
  });

// Routes
app.use('/api/users', userRoutes);

// Server listen
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Menangani penghentian aplikasi (misalnya dengan Ctrl+C)
process.on('SIGINT', () => {
  mongoose.disconnect(() => {
    console.log('MongoDB disconnected');
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  });
});
