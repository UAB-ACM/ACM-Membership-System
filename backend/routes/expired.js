module.exports = function (app, db, config) {

    app.post('/expired', function (req, res) {

        app.checkKey(req.body.key, res, function () {
            var renewal = req.body.renewal;

            if (renewal == '' || typeof renewal == 'undefined') {
                res.send('Please supply a renewal time.');

            } else {

                db.collection('members', function (err, collection) {
                    collection.find({
                        'renewal': new RegExp(renewal, "i")
                    }).toArray(function (err, item) {
                        res.send(item);
                    });
                });
            }
        });
    });

    app.delete('/expired', function (req, res) {

        app.checkKey(req.query.key, res, function () {
            var renewal = req.query.renewal;

            if (renewal == '' || typeof renewal == 'undefined') {
                console.log('renewal is not found');
                res.send('Please supply a renewal time.');

            } else {
                console.log('renewal is found');
                db.collection('members', function (err, collection) {
                    collection.remove({
                        'renewal': new RegExp(renewal, "i")
                    }, {
                        safe: true
                    }, function (err, item) {
                        console.log(item);
                        res.send(item);
                    });
                });
            }
        });
    });

}