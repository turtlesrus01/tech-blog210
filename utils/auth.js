const withAuth = (req, res, next) => {
  //if not logged in, send to to login page
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    //otherwise process continues to callback function in route
    next();
  }
};

module.exports = withAuth;