//import the router module
const router = require('express').Router();

//created the routes for api and home
const apiRoutes = require('./api');
const homeRoutes =require('./homeRoutes');

//assigned the middleware function homeRoutes to the root path
//assigned the middleware function apiRoutes to the /api path
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

//exports the router object
module.exports = router;