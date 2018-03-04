
module.exports = function(router){
    'use strict';
    var Halls = require('.././models/halls');
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    router.post('/',function(req, res) {
        console.log("In halls post"+req);
        var hall = new Halls();      
        hall.name = req.body.name;  
        hall.location = req.body.location;  
        hall.timings = req.body.timings;  
        console.log("request:"+JSON.stringify(req.body));
        
        // save the movie and check for errors
        hall.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Hall created!' ,req: req.body});
        });

    })
// get all the bears (accessed at GET http://localh11ost:8080/api/bears)
    router.get('/',function(req, res) {
        console.log("In hall get");
        Halls.find(function(err, halls) {
            if (err)
                res.send(err);

            res.json(halls);
        });
    });
    router.get('/:hall_id',function(req, res) {
        Halls.findById(req.params.hall_id, function(err, hall) {
            if (err)
                res.send(err);
            res.json(hall);
        });
    })
    router.get('/location/:location',function(req, res) {
        Halls.find({location:req.params.location}, function(err, hall) {
            if (err)
                res.send(err);
            res.json(hall);
        });
    })
   router.put('/:hall_id',function(req, res) {

        // use our bear model to find the bear we want
        Halls.findById(req.params.hall_id, function(err, hall) {

            if (err)
                res.send(err);

            hall.name = req.body.name;  // update the bears info

            // save the bear
            hall.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Hall updated!' });
            });

        });
    })
   router.delete('/:hall_id',function(req, res) {
        Halls.remove({
            _id: req.params.hall_id
        }, function(err, hall) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
 
};