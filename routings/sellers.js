
module.exports = function(router){
    'use strict';
    var Sellers = require('.././models/sellers');
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    router.post('/',function(req, res) {
        console.log("In sells post"+req);
        var seller = new Sellers();      
        seller.name = req.body.name;  
        seller.movie_name = req.body.movie_name;  
        seller.movie_id = req.body.movie_id;  
        seller.tickets = req.body.tickets;  
        seller.price = req.body.price;  
        seller.hall_name = req.body.hall_name;  
        seller.hall_id = req.body.hall_id;  
        seller.location = req.body.location;  
        seller.show_time = req.body.show_time;  
        seller.mobile = req.body.mobile;  
        seller.user_id = req.body.user_id;  
        seller.comments = req.body.comments;  
        seller.language = req.body.language;
        seller.date = req.body.date;
        seller.email = req.body.email;
        seller.image_url = req.body.image_url;
        seller.timestamp = req.body.timestamp;  
        console.log("request:"+JSON.stringify(req.body));
        // save the movie and check for errors
        seller.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Seller created!' ,req: req.body});
        });

    })
// get all the bears (accessed at GET http://localh11ost:8080/api/bears)
    router.get('/',function(req, res) {
        console.log("In hall get");
        Sellers.find(function(err, sellers) {
            if (err)
                res.send(err);

            res.json(sellers);
        });
    });
    router.get('/:seller_id',function(req, res) {
        Sellers.findById(req.params.seller_id, function(err, seller) {
            if (err)
                res.send(err);
            res.json(seller);
        });
    })
    router.get('/movie_id/:movie_id',function(req, res) {
        Sellers.find({movie_id:req.params.movie_id}, function(err, seller) {
            if (err)
                res.send(err);
            res.json(seller);
        });
    })
   router.put('/:seller_id',function(req, res) {

        // use our bear model to find the bear we want
        Sellers.findById(req.params.seller_id, function(err, seller) {

            if (err)
                res.send(err);

            seller.name = req.body.name;  // update the bears info

            // save the bear
            seller.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Seller updated!' });
            });

        });
    })
   router.delete('/:seller_id',function(req, res) {
        Sellers.remove({
            _id: req.params.seller_id
        }, function(err, seller) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
 
};