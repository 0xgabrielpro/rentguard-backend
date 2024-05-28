const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

const createProperty = (property, callback) => {
  const { location, price, description, image, owner_id } = property;
  db.run(`INSERT INTO properties (location, price, description, image, owner_id) VALUES (?, ?, ?, ?, ?)`,
    [location, price, description, image, owner_id], callback);
};

const getPropertyById = (id, callback) => {
  db.get(`SELECT * FROM properties WHERE id = ?`, [id], callback);
};

const getPropertiesByLocation = (location, callback) => {
  db.all(`SELECT * FROM properties WHERE location LIKE ?`, [`%${location}%`], callback);
};

const getAllProperties = (callback) => {
  const query = `
    SELECT properties.*, users.phone as owner_phone 
    FROM properties 
    JOIN users ON properties.owner_id = users.id
  `;
  db.all(query, [], callback);
};


const deleteProperty = (id, callback) => {
  db.run(`DELETE FROM properties WHERE id = ?`, [id], callback);
};

// Other necessary property model functions...

module.exports = {
  createProperty,
  getPropertyById,
  getPropertiesByLocation,
  getAllProperties,
  deleteProperty
};
