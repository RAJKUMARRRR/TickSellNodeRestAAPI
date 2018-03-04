
module.exports = function(router){
    'use strict';
    var nodemailer = require('nodemailer');
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    router.post('/',function(req, res) {
        console.log("In email post"+req.params.OTP);
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'crajkumar72@gmail.com', // Your email id
            pass: '1995raju' // Your password
        }
    });
        
var mailOptions = {
    from: 'crajkumar72@gmail.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'TickSell OTP Verification', // Subject line
    text: req.body.OTP, //, // plaintext body
    html: '<b>Hello TickSell user</b><br><p>Your OTP verification code for activating your account is </p><b>'+req.body.OTP+'</b><br><br><br>Thanks,<br>TickSell Admin' // You can choose to send an HTML body instead
};
        
        
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        console.log(error);
        res.json({yo: 'error'});
    }else{
        console.log('Message sent: ' + info.response);
        res.json({yo: info.response});
    };
});
        
    }); 
};