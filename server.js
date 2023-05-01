//import modules 
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection')

//import sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//express initialization
const app = express();
const PORT = process.env.PORT || 3001;
//handlebars initialization
const hbs = exphbs.create({helpers});
//session options
const sess = {
  secret: 'secret-secret',
  resave: 'false',
  saveUninitialized: 'false'
};
//session initialization
app.use(session(sess));
//handlebars initialization
app.engine('handlebars', hbs.engine);

app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
//connect routes to express
app.use(routes);

sequelize.sync({force: false}).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`))
})