require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const propertyRoutes = require('./routes/propertyRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors');
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

const app = express();
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/admin', adminRoutes);


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

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

router.post('/api/agent_request', (req, res) => {
  const { user_id, agency_name, experience, contact_number } = req.body;

  if (!user_id || !agency_name || !experience || !contact_number) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  const query = `INSERT INTO agrequests (user_id, agency_name, experience, contact_number) VALUES (?, ?, ?, ?)`;
  db.run(query, [user_id, agency_name, experience, contact_number], function(err) {
    if (err) {
      return res.status(500).send({ message: 'Failed to submit request', err });
    }
    res.status(200).send({ message: 'Request submitted successfully' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
