//imported path modules for handling file and directory paths
const path = require('path');
//imported express module, web application framework for Node.js
const express = require('express');
//imported the express-session module for handling sessions in Express.js
const session = require('express-session');
//imported the express-handlebars module, the handlebars templating language
const exhbs = require('express-handlebars');
//assigned the value of the exported object from the ./controllers module
const routes = require('./controllers');
//assigned the value of the exported object from the ./utils/helpers module
const helpers = require('./utils/helpers');
//assigned the value of the exported object from the ./config/connection module
//sets up for the connection to the database using sequelize
const sequelize = require('./config/connection');
//sets up for storing user session data in a database
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exhbs.create({ helpers });

//created an object to store the users session
const sess = {
    secret: 'Super Duper secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// executes the session
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// use method called to execute the routes middleware
app.use(routes);

// Will run the sync method on sequelize object, synchronizing any defined models
// with the database by creating tables and associations.
// force: false will prevent dropping and recreating any existing tables
// Return a promise after sync and the callback function executes
sequelize.sync({ force: false }).then(() => {
    // Initiates the server to start listening on PORT
    app.listen(PORT, () => console.log('NOw listening'));
});