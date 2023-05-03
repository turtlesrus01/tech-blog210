const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

//Get route for retrieving user data
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']]
    });

    const users = userData.map((project) => project.get({ plain: true }));
    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get route for login 
router.get('/login', (req, res) => {
  //if user is not logged in, redirect to root
  if (req.session.logged_in) {
    return res.redirect('/');
  }

  res.render('login');
});

module.exports = router;
