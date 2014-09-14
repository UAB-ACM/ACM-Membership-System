module.exports = function (app, db, config) {

    var fs = require('fs');

    app.post('/change', function (req, res) {
        app.checkKey(req.body.key, res, function () {
            if (req.body.old == config.password) {
                fs.writeFile('config.json', JSON.stringify({
                    password: req.body.new
                }, null, 4), function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("JSON saved to ");
                        config.password = req.body.new;
                    }
                });
            }
        });
    });
}