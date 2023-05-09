// imported express router module 
const router = require('express').Router();
// imports data stored within User found at the models route
const { User } = require('../../models');

// Will create a new user
router.post('/', async (req, res) => {
    try {
      const dbUserData = await User.create({
        // a user object will be populated with a username, email, and paasword
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      
      // Will save the current user's session when they log-in
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(dbUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

// The POST function is executed at the /login path
router.post('/login', async (req, res) => {
    // will attempt to execute the following 
    try {
        // Will search for the user's email within the user database
      const dbUserData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      // When there is no email matching the user's input
      // a response is returned indicating the user's input was incorrect
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res
          .status(200)
          .json({ user: dbUserData, message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Upon being called, a POST operation is performed
router.post('/logout', (req, res) => {
    // If user is logged in, then the session will be deleted
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;