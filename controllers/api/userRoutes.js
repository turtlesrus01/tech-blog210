const router = require('express').Router();
const { User } = require('../../models');
//login route with email and password
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email }});
    //if there is no email, throw error
    if (!userData) {
      return res.status(400).json({ message: 'Wrong email or password, try again.' });
    }
      const validPassword = await userData.checkPassword(req.body.password);
    //if there is an invalid password, throw error
    if (!validPassword) {
      return res.status(400).json({ message: 'Wrong email or password, try again.' });
    }
    //function to save session data and produce success message
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'Logged in successfully!'});
    })
    
  } catch (err) {
    res.status(400).json(err);
  }
});
//logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;


