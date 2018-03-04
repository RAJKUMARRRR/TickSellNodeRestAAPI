console.log("Hello,This my first app.............");
const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const mongoose   = require('mongoose');
config = require('./config/config');
//Express conf !
require('./config/express.config')(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//Including Movies
var movies_router = express.Router();
require('./routings/movies.js')(movies_router);
app.use('/movies', movies_router);
//Including Sells
var seller_router = express.Router();
require('./routings/sellers.js')(seller_router);
app.use('/sellers', seller_router);
//Including Users
var users_router = express.Router();
require('./routings/users.js')(users_router);
app.use('/users', users_router);
//Including hall
var halls_router = express.Router();
require('./routings/halls.js')(halls_router);
app.use('/halls', halls_router);
//Including Reviews
var reviews_router = express.Router();
require('./routings/reviews.js')(reviews_router);
app.use('/reviews', reviews_router);
//Including Cities
var cities_router = express.Router();
require('./routings/cities.js')(cities_router);
app.use('/cities', cities_router);
//Including Email
var email_router = express.Router();
require('./routings/email.js')(email_router);
app.use('/email', email_router);


//Mongoose Conf !
require('./config/mongoose.config')(config);

var db

/*MongoClient.connect('mongodb://rajkumar:ticksell1234@ds115583.mlab.com:15583/ticksell', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  });
});*/

// BASE SETUP
// =============================================================================

var Bear     = require('./models/ticksell_model');
//mongoose.connect('mongodb://rajkumar:ticksell1234@ds115583.mlab.com:15583/ticksell'); // connect to our database
mongoose.createConnection('mongodb://temp:temp@ds115583.mlab.com:15583/ticksell'); 
//mongoose.connect('mongodb://localhost/test'); // connect to our database

var port = process.env.PORT || 3000; 

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)
        console.log("request:"+JSON.stringify(req.body));

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' ,req: req.body});
        });

    })
// get all the bears (accessed at GET http://localh11ost:8080/api/bears)
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err)
                res.send(err);

            res.json(bears);
        });
    });
    router.route('/bears/:bear_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err)
                res.send(err);
            res.json(bear);
        });
    })
   .put(function(req, res) {

        // use our bear model to find the bear we want
        Bear.findById(req.params.bear_id, function(err, bear) {

            if (err)
                res.send(err);

            bear.name = req.body.name;  // update the bears info

            // save the bear
            bear.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Bear updated!' });
            });

        });
    })
.delete(function(req, res) {
        Bear.remove({
            _id: req.params.bear_id
        }, function(err, bear) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
// START THE SERVER
// =============================================================================
//app.listen(port);
app.listen(process.env.PORT || config.dev.port, () => {
console.log('Magic happens on port ' + config.dev.port);
});

/*app.get('/', function(req, res) {
db.collection('quotes').find().toArray(function(err, results) {
  console.log(results)
  // send HTML file populated with quotes here
});
});

app.use(bodyParser.urlencoded({extended: true}));

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database');
    res.redirect('/');
  })
});*/