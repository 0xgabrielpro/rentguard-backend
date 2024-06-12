const faker = require('faker');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const db = new sqlite3.Database('./db/database.sqlite');

const seedUsers = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT UNIQUE,
      phone TEXT,
      password TEXT,
      role TEXT DEFAULT 'tenant'
    )`);

    let username = "admin";
    let email = "admin@example.com";
    let phone = "+255678901234";
    let password = "password";
    let hashedPassword = bcrypt.hashSync(password, 10);

    for (let j = 0; j < 3; j++) {
      if(j === 0){
        db.run(`INSERT INTO users (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)`,
        [username, email, phone, hashedPassword, username], (err) => {
          if (err) {
            console.error('Error seeding user:', err);
          } else {
            console.log(`User ${username} seeded successfully`);
          }
        });
      }
      else if( j === 1){
        username = "tenant";
        email = "tenant@example.com";

        db.run(`INSERT INTO users (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)`,
        [username, email, phone, hashedPassword, username], (err) => {
          if (err) {
            console.error('Error seeding user:', err);
          } else {
            console.log(`User ${username} seeded successfully`);
          }
        });
      } else if(j === 2) {
        username = "owner";
        email = "owner@example.com";
      
        db.run(`INSERT INTO users (username, email, phone, password, role) VALUES (?, ?, ?, ?, ?)`,
        [username, email, phone, hashedPassword, username], (err) => {
          if (err) {
            console.error('Error seeding user:', err);
          } else {
            console.log(`User ${username} seeded successfully`);
          }
        });
      }
   
    }

    for (let i = 0; i < 10; i++) {
      username = faker.internet.userName();
      email = faker.internet.email();
      phone = "+255678901234";

      db.run(`INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)`,
        [username, email, phone, hashedPassword], (err) => {
          if (err) {
            console.error('Error seeding user:', err);
          } else {
            console.log(`User ${username} seeded successfully`);
          }
        });
    }
  });
};

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

    for (let i = 0; i < 10; i++) {
      const location = faker.address.city();
      const price = faker.random.number({ min: 1000, max: 100000 });
      const description = faker.lorem.sentence();
      // const image = "http://abasi.duckdns.org:3000/images/nyumba.png";
      const image = "http://192.168.43.230:3000/images/nyumba.png";
      const owner_id = faker.random.number({ min: 1, max: 10 });

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

const seedRequests = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      request TEXT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);
    
    for (let i = 0; i < 10; i++) {
      const request = faker.lorem.sentence();
      const user_id = faker.random.number({ min: 1, max: 10 }); 

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

const seedAgrequests = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS agrequests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      agent_name TEXT,
      email TEXT,
      experience TEXT,
      contact_number TEXT,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`);

    for (let i = 0; i < 10; i++) {
      const agentName = faker.name.findName();
      const email = faker.internet.email();
      const experience = faker.random.number({ min: 1, max: 20 }).toString();
      const contactNumber = faker.phone.phoneNumber();
      const userId = faker.random.number({ min: 1, max: 10 }); 

      db.run(`INSERT INTO agrequests (agent_name, email, experience, contact_number, user_id)
        VALUES (?, ?, ?, ?, ?)`, [agentName, email, experience, contactNumber, userId], (err) => {
        if (err) {
          console.error('Error seeding agrequests:', err);
        } else {
          console.log(`Agrequest for ${agentName} seeded successfully`);
        }
      });
    }
  });
};

seedUsers();
seedProperties();
seedRequests();
seedAgrequests();

db.close((err) => {
  if (err) {
    console.error('Error closing database connection:', err);
  } else {
    console.log('Database connection closed');
  }
});
