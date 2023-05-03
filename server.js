//import modules 
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');

//import sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//express initialization
const app = express();
const PORT = process.env.PORT || 3001;
//handlebars initialization
const hbs = exphbs.create();
//session options
const sess = {
  secret: 'secret-secret',
  //cookie storage for client-data
  cookie: {
    maxAge: 100000,
    httpOnly: true,
    secure:false,
    sameSite: 'strict'
  },
  resave: false,
  saveUninitialized: false,
  //opening session storage data
  store: new SequelizeStore({
    db: sequelize
  })
};
//session initialization
app.use(session(sess));

//handlebars initialization
app.engine('handlebars', hbs.engine);
//connect express to handlebars engine 
app.set('view engine', 'handlebars');

//Express middleware Json parser 
app.use(express.json());
//Express middleware URL parser
app.use(express.urlencoded({extended: true }));
//Express middleware to serve static files from directory
app.use(express.static(path.join(__dirname, 'public')));
//connect routes to express
app.use(routes);

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
})