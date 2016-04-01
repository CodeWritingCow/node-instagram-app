//	GRAB THE PACKAGES/VARIABLES WE NEED
//	=============================================	
// load environmental variables. dotenv works in development environment only!
require('dotenv').config();

var express = require('express'),
	app = express(),
	ig = require('instagram-node').instagram();


//	CONFIGURE THE APP
//	=============================================
//	tell node where to look for site resources
app.use(express.static(__dirname + '/public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

// configure instagram app with client-id
ig.use({
	access_token: process.env.ACCESS_TOKEN,
	client_id: process.env.CLIENT_ID,
	client_secret: process.env.CLIENT_SECRET
});


//	SET THE ROUTES
//	=============================================
//	home page route - popular images
app.get('/', function(req, res) {

	// add access token
	ig.use({ access_token: process.env.ACCESS_TOKEN });

	// use the instagram package to get popular images
	ig.media_popular(function(err, medias, remaining, limit) {

		// render the home page and pass in the popular images
		res.render('pages/index', { grams: medias });
	});
});


//	START THE SERVER
//	=============================================
app.listen(8080);
console.log('App started! Look at http://localhost:8080');