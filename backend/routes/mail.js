module.exports = function (app, db, config) {
    
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.email,
            pass: config.emailpass
        }
    });

    app.post('/mail', function (req, res) {

        var mailOptions = {
            from: 'uabacm@gmail.com',
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text,
        };

        app.checkKey(req.body.key, res, function () {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        });
    });

    app.post('/mail/all', function (req, res) {

        app.checkKey(req.body.key, res, function () {
            db.collection('members', function (err, collection) {
                collection.find({}, {
                    email: 1
                }).toArray(function (err, emails) {
                    var mailOptions = {
                        from: 'uabacm@gmail.com',
                        to: emails,
                        subject: req.body.subject,
                        text: req.body.text,
                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Message sent: ' + info.response);
                        }
                    });
                });
            });
        });

    });

}