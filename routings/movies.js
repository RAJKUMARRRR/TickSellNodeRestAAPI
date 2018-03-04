
module.exports = function(router){
    'use strict';
    var Movies = require('.././models/movies');
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    router.post('/',function(req, res) {
        console.log("In movies post"+req);
        var movie = new Movies();      
        movie.name = req.body.name;  
        movie.language = req.body.language;  
        movie.screen = req.body.screen;  
        movie.certificate = req.body.certificate;  
        movie.actors = req.body.actors;  
        movie.jonour = req.body.jonour;  
        movie.synopsis = req.body.synopsis;  
        movie.likes = req.body.likes;  
        movie.is_released = req.body.is_released;  
        movie.trailer_link = req.body.trailer_link;  
        movie.image = req.body.image;  
        movie.alt_image = req.body.alt_image;
        movie.dislikes = req.body.dislikes;
        movie.rating = req.body.rating;
        movie.isDeleted = req.body.isDeleted;
        console.log("request:"+JSON.stringify(req.body));
        // save the movie and check for errors
        movie.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Movie created!' ,req: req.body});
        });

    })
    router.post('/movie_likes/:movie_id',function(req, res) {
        Movies.findById(req.params.movie_id, function(err, movie) {

            if (err)
                res.send(err);

            movie.likes = req.body.likes;  
            movie.dislikes = req.body.dislikes;
            movie.rating = req.body.rating;

            // save the bear
            movie.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Movie updated!' });
            });

        });
    })
// get all the bears (accessed at GET http://localh11ost:8080/api/bears)
    router.get('/',function(req, res) {
        console.log("In movies get");
        Movies.find({isDeleted:false},function(err, movies) {
            if (err)
                res.send(err);

            res.json(movies);
        });
    });
    router.get('/:movie_id',function(req, res) {
        Movies.findById(req.params.movie_id, function(err, movie) {
            if (err)
                res.send(err);
            res.json(movie);
        });
    })
   router.put('/:movie_id',function(req, res) {

        // use our bear model to find the bear we want
        Movies.findById(req.params.movie_id, function(err, movie) {

            if (err)
                res.send(err);

            movie.name = req.body.name;  // update the bears info
            movie.language = req.body.language;  
            movie.screen = req.body.screen;  
            movie.certificate = req.body.certificate;  
            movie.actors = req.body.actors;  
            movie.jonour = req.body.jonour;  
            movie.synopsis = req.body.synopsis;  
            movie.likes = req.body.likes;  
            movie.is_released = req.body.is_released;  
            movie.trailer_link = req.body.is_released;  
            movie.image = req.body.image;  
            movie.dislikes = req.body.dislikes;
            movie.rating = req.body.rating;

            // save the bear
            movie.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Movie updated!' });
            });

        });
    })
   router.delete('/:movie_id',function(req, res) {
        Movies.remove({
            _id: req.params.movie_id
        }, function(err, movie) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
 
};