const faker = require('faker');
const sqlite3 = require('sqlite3').verbose();

// Create new SQLite database instance
const db = new sqlite3.Database('./db/database.sqlite');

// Define function to seed users
const seedUsers = () => {
  db.serialize(() => {
    // Create users table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      phone TEXT,
      password TEXT,
      role TEXT DEFAULT 'tenant'
    )`);

    // Generate fake users and insert into database
    for (let i = 0; i < 10; i++) {
      const username = faker.internet.userName();
      const email = faker.internet.email();
      const phone = "+255678901234";
      const password = "password";

      db.run(`INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)`,
        [username, email, phone, password], (err) => {
          if (err) {
            console.error('Error seeding user:', err);
          } else {
            console.log(`User ${username} seeded successfully`);
          }
        });
    }
  });
};

// Define function to seed properties
const seedProperties = () => {
  db.serialize(() => {
    // Create properties table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS properties (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      location TEXT,
      price REAL,
      description TEXT,
      image TEXT,
      owner_id INTEGER,
      FOREIGN KEY (owner_id) REFERENCES users(id)
    )`);

    // Generate fake properties and insert into database
    for (let i = 0; i < 10; i++) {
      const location = faker.address.city();
      const price = faker.random.number({ min: 1000, max: 100000 });
      const description = faker.lorem.sentence();
      const image = "http://138.197.92.200:3000/images/nyumba.png";
      const owner_id = faker.random.number({ min: 1, max: 10 }); // Assuming users are seeded first

      db.run(`INSERT INTO properties (location, price, description, image, owner_id)
        VALUES (?, ?, ?, ?, ?)`, [location, price, description, image, owner_id], (err) => {
        if (err) {
          console.error('Error seeding property:', err);
        } else {
          console.log(`Property at ${location} seeded successfully`);
        }
      });
    }
  });
};

// Define function to seed requests
const seedRequests = () => {
  db.serialize(() => {
    // Create requests table if not exists
    db.run(`CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      request TEXT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    // Generate fake requests and insert into database
    for (let i = 0; i < 10; i++) {
      const request = faker.lorem.sentence();
      const user_id = faker.random.number({ min: 1, max: 10 }); // Assuming users are seeded first

      db.run(`INSERT INTO requests (request, user_id) VALUES (?, ?)`, [request, user_id], (err) => {
        if (err) {
          console.error('Error seeding request:', err);
        } else {
          console.log(`Request "${request}" seeded successfully`);
        }
      });
    }
  });
};

// Call functions to seed data
seedUsers();
seedProperties();
seedRequests();

// Close database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database connection:', err);
  } else {
    console.log('Database connection closed');
  }
});
