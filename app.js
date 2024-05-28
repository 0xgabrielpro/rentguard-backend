require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/admin', adminRoutes);


app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/images', (req, res) => {
  const fs = require('fs');
  const imagesDir = path.join(__dirname, 'images');

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory');
    }

    const imageFiles = files.filter(file => {
      return /\.(jpg|jpeg|png|gif)$/.test(file);
    });

    res.json(imageFiles);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
