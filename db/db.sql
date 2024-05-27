-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  email TEXT UNIQUE,
  phone TEXT,
  gender TEXT,
  password TEXT,
  role TEXT DEFAULT 'tenant'
);

-- Properties table
CREATE TABLE IF NOT EXISTS properties (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  location TEXT,
  price REAL,
  phone TEXT,
  email TEXT,
  description TEXT,
  image TEXT,
  owner_id INTEGER,
  FOREIGN KEY (owner_id) REFERENCES users(id)
);

-- Requests table
CREATE TABLE IF NOT EXISTS requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  request TEXT,
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
