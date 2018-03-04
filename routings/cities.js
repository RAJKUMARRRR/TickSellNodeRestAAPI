
module.exports = function(router){
    'use strict';
    var Cities = require('.././models/cities');
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    router.post('/',function(req, res) {
        console.log("In cities post"+req);
        var city = new Cities();      
        city.name = req.body.name;  
        console.log("request:"+JSON.stringify(req.body));
        // save the movie and check for errors
        city.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'City created!' ,req: req.body});
        });

    })
// get all the bears (accessed at GET http://localh11ost:8080/api/bears)
    router.get('/',function(req, res) {
        console.log("In hall get");
        Cities.find(function(err, halls) {
            if (err)
                res.send(err);

            res.json(halls);
        });
    });
    router.get('/:city_id',function(req, res) {
        Cities.findById(req.params.city_id, function(err, city) {
            if (err)
                res.send(err);
            res.json(city);
        });
    })
   router.put('/:city_id',function(req, res) {

        // use our bear model to find the bear we want
        Cities.findById(req.params.city_id, function(err, city) {

            if (err)
                res.send(err);

            city.name = req.body.name;  // update the bears info

            // save the bear
            city.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'City updated!' });
            });

        });
    })
   router.delete('/:city_id',function(req, res) {
        Cities.remove({
            _id: req.params.city_id
        }, function(err, city) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
 
};