var nodemailer = require("nodemailer"),
    config = require('../config/config')

var Mailer =  function(){

    var transport = nodemailer.createTransport("SMTP", {
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: config.smtp.username,
        pass: config.smtp.password
    } });

    this.send =function(from, to, subject, body){
        
        var message = {
            from: from,

            // Comma separated list of recipients
            to: to,

            // Subject of the message
            subject: subject, //

            // plaintext body
            text: body.replace(/(<([^>]+)>)/ig,""),

            // HTML body
            html: body

        }

        var mailer = transport.sendMail(message, function(error){
            if(error){
                console.log('Error occured');
                console.log(error.message);
                return;
            }
            console.log('Message sent successfully!');
        })
        console.log(mailer)
        return mailer;
    }
}

module.exports = exports = new Mailer();