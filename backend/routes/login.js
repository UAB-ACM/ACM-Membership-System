module.exports = function (app, db, config) {

    var md5 = require('MD5');

    app.post('/login', function (req, res) {
        var password = req.body.password;

        if (password == config.password) {
            var key = md5(new Date().getTime());
            db.collection('keys', function (err, collection) {
                collection.insert({
                    'time': new Date(),
                    'key': key
                }, {
                    safe: true
                }, function (err, result) {
                    if (err) {
                        res.send({
                            'error': 'An error occurred'
                        });
                    } else {
                        res.send(key);
                    }
                });
            });
        } else {
            res.send({
                'error': 'Invalid password.'
            });
        }
    });

}