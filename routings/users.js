
module.exports = function(router){
    'use strict';
    var Users = require('.././models/users');
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    router.post('/',function(req, res) {
        console.log("In users post"+req);
        var user = new Users();      
        user.name = req.body.name;  
        user.mobile = req.body.mobile;  
        user.email = req.body.email; 
        user.password = req.body.password;
        user.profile_image_url = req.body.profile_image_url;
        user.liked = req.body.liked;
        user.disliked = req.body.disliked;
        console.log("request:"+JSON.stringify(req.body));
        // save the movie and check for errors
        Users.find({email:req.body.email}, function(err, user_res) {
            if (err)
                res.send(err);
            if(user_res.length === 0 || user_res === null){
               user.save(function(err) {
                 if (err)
                    res.send(err);
                   res.json({ message: 'User created!' ,req: req.body});
               });
            }
            else{
                  res.json({status:'Login Success',status_code:"2000",profile:user_res[0]});
            }
        });
    })
    router.post('/login/',function(req, res) {
        console.log("In users login"+req);
        var email = req.body.email;  
        var password = req.body.password;
        console.log("request:"+JSON.stringify(req.body));
        Users.find({email:email}, function(err, user) {
            if (err)
                res.send(err);
            if(user.length === 0 || user === null){
            res.json({status:'User does not exit!',status_code:"5000"});
            }
            else{
                if(user[0].password == password)
                  res.json({status:'Login Success',status_code:"2000",profile:user[0]});
                else
                  res.json({status:'Invalid Password',status_code:"3000"});
            }
        });
    })
// get all the bears (accessed at GET http://localh11ost:8080/api/bears)
    router.get('/',function(req, res) {
        console.log("In users get");
        Users.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });
    router.get('/email/:email',function(req, res) {
        Users.find({email:req.params.email}, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
    router.get('/:user_id',function(req, res) {
        Users.find(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
   router.post('/:user_id',function(req, res) {

        // use our bear model to find the bear we want
        Users.findById(req.params.user_id, function(err, user) {

            if (err)
                res.send(err);

            user.name = req.body.name;  // update the bears info
            user.mobile = req.body.mobile;  
            user.email = req.body.email; 
            user.liked = req.body.liked;
            user.disliked = req.body.disliked;

            // save the bear
            user.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'User updated!' });
            });

        });
    })
   router.delete('/:user_id',function(req, res) {
        Users.remove({
            _id: req.params.user_id
        }, function(err, movie) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
 
};