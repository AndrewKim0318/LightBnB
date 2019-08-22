const { Pool }  = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'password',
  host: 'localhost',
  database: 'lightbnb',
});

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1;
  `;
  const queryParams = [email];
  
  return pool.query(queryString, queryParams)
  .then (res => res.rows[0]);

}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  const queryString = `
    SELECT *
    FROM users
    WHERE id = $1;
  `;
  const queryParams = [id];
  
  return pool.query(queryString, queryParams)
  .then (res => res.rows[0] );

  // return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const queryString = `
    INSERT INTO users(name, email, password)
    VALUES ($1, $2, $3);
    RETURNING *
  `;
  const queryParams = [user.name, user.email, user.password];
  
  return pool.query(queryString, queryParams)
  .then (res => {
    return res.rows[0];
  });

}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  const queryString = `
    SELECT
    reservations.*,
    properties.*,
    AVG(property_reviews.rating) AS average_rating
    FROM properties
      JOIN reservations ON properties.id = reservations.property_id
      JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1 AND reservations.end_date < now()::DATE
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date DESC LIMIT $2;
    `;
  const queryParams = [guest_id, limit];

  return pool.query(queryString, queryParams)
  .then(res => {
    return res.rows;
  });
  
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  // Create values array
  const queryParams = [];
  // Create text string
  let queryString = `
  SELECT properties.*, AVG(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // Set conditions
  // If city parameter is in options
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }

  // If owner_id parameter is in options, only return properties belonging to the owner
  if (options.guest_id) {
    queryParams.push(options.guest_id);
    if (queryParams.length === 1) {
      queryString += `WHERE properties.owner_id = $${queryParams.length}`;
    } else {
      queryString += `AND properties.owner_id = $${queryParams.length}`;
    }
  }
  
  // If minimum_price_per_night AND maximum_price_per_night is in options, only return properties within that price range
  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    queryParams.push(options.maximum_price_per_night);

    if(queryParams.length === 2) {
      queryString += `WHERE cost_per_night > $${(queryParams.length - 1)} AND cost_per_night < $${(queryParams.length)}`; 
    } else {
      queryString += `AND cost_per_night > $${(queryParams.length - 1)} AND cost_per_night < $${(queryParams.length)}`;
    }
  }
  // If minimum_rating is in options, only return properties with a rating equal or higher than that
  if (options.minimum_rating) {
    queryParams.push(Number(options.minimum_rating));
    queryString += `
    GROUP BY properties.id
    HAVING AVG(property_reviews.rating) = $${queryParams.length}
    `;
    queryParams.push(limit);
    queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  } else { // Add the number of properties you want to see
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  }

  return pool.query(queryString, queryParams)
  .then(res => {
    return res.rows;
  });
  
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString = `
  INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *;
  `;
  const queryParams = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms,
    property.country,
    property.street,
    property.city,
    property.province,
    property.post_code,
  ];

  return pool.query(queryString, queryParams)
  .then(res => res.rows[0]);

}
exports.addProperty = addProperty;
