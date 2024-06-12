const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.sqlite');

const createProperty = (property, callback) => {
  const { location, price, description, image, ownerId } = property;
  // const fullImageUrl = `http://abasi.duckdns.org:3000/images/${image}`;
  const fullImageUrl = `http://192.168.43.230:3000/images/${image}`;
  db.run(`INSERT INTO properties (location, price, description, image, owner_id) VALUES (?, ?, ?, ?, ?)`,
    [location, price, description, fullImageUrl, ownerId], callback);
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


const getAllPropertiesByOwnerId = (ownerId, callback) => {
  const query = `
    SELECT properties.*, users.phone as owner_phone 
    FROM properties 
    JOIN users ON properties.owner_id = users.id
    WHERE properties.owner_id = ?
  `;
  db.all(query, [ownerId], callback);
};

const deleteProperty = (id, callback) => {
  console.log(id);
  db.run(`DELETE FROM properties WHERE id = ?`, [id], callback);
};

const updateProperty = (req, callback) => {
  const { id, location, price, description, image, ownerId } = req;
 
  let query = `UPDATE properties SET location = ?, price = ?, description = ?, owner_id = ? WHERE id = ?`;
  let params = [location, price, description, ownerId, id];

  if (image) {
    // const fullImageUrl = `http://abasi.duckdns.org:3000/images/${image}`;
    const fullImageUrl = `http://192.168.43.230:3000/images/${image}`;
    query = `UPDATE properties SET location = ?, price = ?, description = ?, image = ?, owner_id = ? WHERE id = ?`;
    params = [location, price, description, fullImageUrl, ownerId, id];
  }

  db.run(query, params, callback);
};


module.exports = {
  getAllPropertiesByOwnerId,
  createProperty,
  getPropertyById,
  getPropertiesByLocation,
  getAllProperties,
  updateProperty,
  deleteProperty
};
