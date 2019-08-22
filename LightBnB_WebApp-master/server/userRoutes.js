const bcrypt = require('bcrypt');
const db = require('./database');

module.exports = function(router, database) {

  // Create a new user
  router.post('/', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    
    
    // database.addUser(user)
    const queryString = `
    INSERT INTO users(name, email, password)
    VALUES ($1, $2, $3);
    RETURNING *
    `;
    const queryParams = [user.name, user.email, user.password];
    
    db.query(queryString, queryParams)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch(e => res.send(e));
  });

  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
  const login =  function(email, password) {
    // return database.getUserWithEmail(email)

    const queryString = `
    SELECT *
    FROM users
    WHERE email = $1;
    `;
    const queryParams = [email];
    
    db.query(queryString, queryParams)
    .then (res => res.rows[0])
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }
  exports.login = login;

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
      })
      .catch(e => res.send(e));
  });
  
  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.send({});
  });

  router.get("/me", (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      res.send({message: "not logged in"});
      return;
    }

    // database.getUserWithId(userId)
    const queryString = `
    SELECT *
    FROM users
    WHERE id = $1;
    `;
    const queryParams = [userId];
    
    db.query(queryString, queryParams)
    .then (res => res.rows[0] )
    .then(user => {
      if (!user) {
        res.send({error: "no user with that id"});
        return;
      }
      res.send({user: {name: user.name, email: user.email, id: userId}});
    })
    .catch(e => res.send(e));
  });

  return router;
}