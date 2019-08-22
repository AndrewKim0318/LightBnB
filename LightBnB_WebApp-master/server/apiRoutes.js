module.exports = function(router, database) {
  const db = require('./database');

  router.get('/properties', (req, res) => {

    // Create values array
    let queryParams = [];
    // Create text string
    let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) as average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_id
    `;

    // Set conditions
    // If city parameter is in options
    if (req.query.city) {
      queryParams.push(`%${req.query.city}%`);
      queryString += `WHERE city LIKE $${queryParams.length} `;
    }

    // If owner_id parameter is in options, only return properties belonging to the owner
    if (req.query.guest_id) {
      queryParams.push(req.query.guest_id);
      if (queryParams.length === 1) {
        queryString += `WHERE properties.owner_id = $${queryParams.length}`;
      } else {
        queryString += `AND properties.owner_id = $${queryParams.length}`;
      }
    }
    
    // If minimum_price_per_night AND maximum_price_per_night is in options, only return properties within that price range
    if (req.query.minimum_price_per_night && req.query.maximum_price_per_night) {
      queryParams.push(options.minimum_price_per_night);
      queryParams.push(options.maximum_price_per_night);

      if(queryParams.length === 2) {
        queryString += `WHERE cost_per_night > $${(queryParams.length - 1)} AND cost_per_night < $${(queryParams.length)}`; 
      } else {
        queryString += `AND cost_per_night > $${(queryParams.length - 1)} AND cost_per_night < $${(queryParams.length)}`;
      }
    }
    // If minimum_rating is in options, only return properties with a rating equal or higher than that
    if (req.query.minimum_rating) {
      queryParams.push(Number(req.query.minimum_rating));
      queryString += `
      GROUP BY properties.id
      HAVING AVG(property_reviews.rating) >= $${queryParams.length}
      `;
      queryParams.push(20);
      queryString += `
      ORDER BY cost_per_night
      LIMIT $${queryParams.length};
      `;
    } else { // Add the number of properties you want to see
      queryParams.push(20);
      queryString += `
      GROUP BY properties.id
      ORDER BY cost_per_night
      LIMIT $${queryParams.length};
      `;
    }

    db.query(queryString, queryParams)
     // database.getAllProperties(req.query, 20)
    .then(res => res.rows)
    .then(properties => {
      res.send({properties})
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    }); 
  });

  router.get('/reservations', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.error("💩");
      return;
    }
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
    const queryParams = [userId, 10];

    // database.getAllReservations(userId)
    db.query(queryString, queryParams)
    .then(res => res.rows)
    .then(reservations => {
      res.send({reservations});
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.post('/properties', (req, res) => {
    const userId = req.session.userId;
    const queryString = `
    INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
    `;
    const queryParams = [
      req.body.owner_id,
      req.body.title,
      req.body.description,
      req.body.thumbnail_photo_url,
      req.body.cover_photo_url,
      req.body.cost_per_night,
      req.body.parking_spaces,
      req.body.number_of_bathrooms,
      req.body.number_of_bedrooms,
      req.body.country,
      req.body.street,
      req.body.city,
      req.body.province,
      req.body.post_code,
    ];

    db.query(queryString, queryParams)
    .then(res => res.rows)
    .then(property => {
      res.send(property);
    })
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  return router;
}