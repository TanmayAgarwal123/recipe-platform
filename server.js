  const express = require('express');
  const passport = require('passport');
  const LocalStrategy = require('passport-local').Strategy;
  const bcrypt = require('bcrypt');
  const session = require('express-session');
  
  const app = express();
  
  // Middleware to handle JSON and URL-encoded requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Use session to keep track of login status
  app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Configure the local strategy
  passport.use(new LocalStrategy((username, password, done) => {
    // Here, you'd typically fetch the user from your database
    // For this example, let's assume you have a "getUserByUsername" function
    const user = getUserByUsername(username);
  
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }
  
    // Check if the password is correct using bcrypt
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    });
  }));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  // Deserialize user when needed
  passport.deserializeUser((id, done) => {
    // Here, you'd fetch the user from the database using the user's ID
    const user = getUserById(id);
    done(null, user);
  });
  
  app.post('/register', (req, res) => {
    // Hash the password using bcrypt
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      if (err) throw err;
  
      // Save the user to the database with the hashed password
      // For this example, assume you have a "createUser" function
      createUser(req.body.username, hashedPassword);
      res.redirect('/login');
    });
  });
  
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));
  
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
  });
  
  // Basic route
  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  