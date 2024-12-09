const express = require('express');
const cors = require('cors');
const path = require('path');
const allRoutes = require('./routes');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await db;
    console.log('✔️  Berhasil terhubung ke MongoDB');

    app.use(cors()); 
    app.use(express.json({ limit: '150mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true })); 
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    app.use(allRoutes);

    app.get('/', (req, res) => {
      res.send('Halo! API Anda berjalan dengan baik.');
    });

    app.use((req, res, next) => {
      res.status(404).json({
        message: 'Rute tidak ditemukan. Periksa kembali URL Anda.',
      });
    });

    app.use((err, req, res, next) => {
      console.error('❌ Error terjadi:', err.message || err);
      res.status(500).json({
        message: 'Terjadi kesalahan pada server. Mohon coba lagi nanti.',
        error: err.message || err,
      });
    });

    app.listen(port, () => {
      console.log(`🚀 Aplikasi berjalan pada: http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Gagal terhubung ke database:', err.message || err);
  }
}

startServer();
