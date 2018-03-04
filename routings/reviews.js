
module.exports = function(router){
    'use strict';
    var Reviews = require('.././models/reviews');
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    router.post('/',function(req, res) {
        console.log("In revies post"+req);
        var review = new Reviews();      
        review.user_id = req.body.user_id;  
        review.movie_id = req.body.movie_id;  
        review.title = req.body.title;  
        review.heighlites = req.body.heighlites;  
        review.drawbacks = req.body.drawbacks;  
        review.analysis = req.body.analysis;  
        review.tagline = req.body.tagline;  
        review.rating = req.body.rating;  
        review.timestamp = req.body.timestamp;  
        review.user_name = req.body.user_name;
        review.image_url = req.body.image_url;
        console.log("request:"+JSON.stringify(req.body));
        // save the movie and check for errors
        review.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Review created!' ,req: req.body});
        });

    })
// get all the bears (accessed at GET http://localh11ost:8080/api/bears)
    router.get('/',function(req, res) {
        console.log("In hall get");
        Reviews.find(function(err, reviews) {
            if (err)
                res.send(err);

            res.json(reviews);
        });
    });
    router.get('/:review_id',function(req, res) {
        Reviews.findById(req.params.review_id, function(err, review) {
            if (err)
                res.send(err);
            res.json(review);
        });
    })
    router.get('/movie_id/:movie_id',function(req, res) {
        Reviews.find({movie_id:req.params.movie_id}, function(err, review) {
            if (err)
                res.send(err);
            res.json(review);
        });
    })
   router.put('/:review_id',function(req, res) {

        // use our bear model to find the bear we want
        Reviews.findById(req.params.review_id, function(err, review) {

            if (err)
                res.send(err);

            review.name = req.body.name;  // update the bears info

            // save the bear
            review.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Review updated!' });
            });

        });
    })
   router.delete('/:review_id',function(req, res) {
        Reviews.remove({
            _id: req.params.review_id
        }, function(err, review) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
 
};