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

//	ramen page route - latest ramen images
app.get('/ramen', function (req, res) {

	ig.use({ access_token: process.env.ACCESS_TOKEN });
	ig.tag_media_recent('ramen', function(err, medias, pagination, remaining, limit) {
		res.render('pages/index', { grams: medias });
	});
});

// sushi page route - latest sushi images
app.get('/sushi', function (req, res) {

	ig.use({ access_token: process.env.ACCESS_TOKEN });
	ig.tag_media_recent('sushi', function(err, medias, pagination, remaining, limit) {
		res.render('pages/index', { grams: medias });
	});
});

// user:pangofhunger route - latest images from pangofhunger (AKA Gary Pang, CodeWritingCow!)
app.get('/pangofhunger', function(req, res) {
	
	ig.use({ access_token: process.env.ACCESS_TOKEN });
	ig.user_media_recent(process.env.PANGOFHUNGER_ID, function(err, medias, pagination, remaining, limit) {
		res.render('pages/index', { grams: medias });
	});
});

// user:pressenterpa route - latest images from pressenterpa
app.get('/pressenterpa', function(req, res) {
	
	ig.use({ access_token: process.env.ACCESS_TOKEN });
		ig.user_media_recent(process.env.PRESSENTERPA_ID, function(err, medias, pagination, remaining, limit) {
		res.render('pages/index', {grams: medias });
	});
});

//	START THE SERVER
//	=============================================
app.listen(8080);
console.log('App started! Look at http://localhost:8080');