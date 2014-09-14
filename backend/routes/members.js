module.exports = function (app, db, config) {

    app.get('/members/:blazerid', function (req, res) {
        console.log('callback called');
        var blazerid = req.params.blazerid;

        if (req.query.key) {
            if (blazerid == '' || typeof blazerid == 'undefined') {
                res.send({
                    error: "Please supply a blazerid."
                });
            } else {

                app.checkKey(req.query.key, res, function () {
                    console.log('Retrieving member: ' + blazerid);
                    db.collection('members', function (err, collection) {
                        collection.findOne({
                            'blazerid': blazerid
                        }, function (err, item) {
                            res.send(item);
                        });
                    });
                });
            }
        } else {
            console.log('Retrieving member: ' + blazerid);
            db.collection('members', function (err, collection) {
                collection.findOne({
                    'blazerid': blazerid
                }, {
                    name: 1,
                    join: 1,
                    renewal: 1
                }, function (err, item) {
                    res.send(item);
                });
            });
        }
    });

    //additional work
    app.get('/members', function (req, res) {

        db.collection('members', function (err, collection) {
            collection.find({}, {
                blazerid: 1,
                name: 1
            }).toArray(function (err, items) {
                res.send(items);
            });
        });
    });



    app.post('/members', function (req, res) {

        app.checkKey(req.body.key, res, function () {
            var member = req.body;

            if (member.blazerid == '' || typeof member.blazerid == 'undefined') {

                res.send('Please supply a blazerid.');

            } else if (member.email == '' || typeof member.email == 'undefined') {

                res.send('Please supply an email.');

            } else if (member.renewal == '' || typeof member.renewal == 'undefined') {

                res.send('Please supply a renewal time.');

            } else if (member.name == '' || typeof member.name == 'undefined') {

                res.send('Please supply a name.');

            } else {

                db.collection('keys', function (err, collection) {
                    collection.findOne({
                        'key': req.body.key
                    }, function (err, item) {
                        if (item) {

                            console.log('Adding member: ' + JSON.stringify(member));
                            db.collection('members', function (err, collection) {
                                collection.insert(member, {
                                    safe: true
                                }, function (err, result) {
                                    if (err) {
                                        res.send({
                                            'error': 'An error has occurred'
                                        });
                                    } else {
                                        console.log('Success: ' + JSON.stringify(result[0]));
                                        res.send(result[0]);
                                    }
                                });
                            });

                        } else {
                            res.send("Invalid key.");
                        }
                    });
                });

            }
        });
    });

    app.put('/members/:blazerid', function (req, res) {

        app.checkKey(req.body.key, res, function () {
            var blazerid = req.params.blazerid;
            var member = req.body;
            console.log('Updating member: ' + blazerid);


            if (member.blazerid == '' || typeof member.blazerid == 'undefined') {

                res.send('Please supply a blazerid.');

            } else if (member.email == '' || typeof member.email == 'undefined') {

                res.send('Please supply an email.');

            } else if (member.renewal == '' || typeof member.renewal == 'undefined') {

                res.send('Please supply a renewal time.');

            } else if (member.name == '' || typeof member.name == 'undefined') {

                res.send('Please supply a name.');

            } else {

                db.collection('keys', function (err, collection) {
                    collection.findOne({
                        'key': req.body.key
                    }, function (err, item) {
                        if (item) {

                            delete member["_id"];

                            db.collection('members', function (err, collection) {
                                collection.update({
                                    'blazerid': blazerid
                                }, member, {
                                    safe: true
                                }, function (err, result) {
                                    if (err) {
                                        console.log('Error updating member: ' + err);
                                        res.send({
                                            'error': 'An error has occurred'
                                        });
                                    } else {
                                        console.log('' + result + ' document(s) updated');
                                        res.send(member);
                                    }
                                });
                            });

                        } else {
                            res.send("Invalid key.");
                        }
                    });
                });
            }
        });
    });

    app.delete('/members/:blazerid', function (req, res) {

        console.log(req.query.key);
        app.checkKey(req.query.key, res, function () {
            var blazerid = req.params.blazerid;
            console.log('Deleting member: ' + blazerid);

            if (blazerid == '' || typeof blazerid == 'undefined') {

                res.send('Please supply a blazerid.');

            } else {

                db.collection('members', function (err, collection) {
                    collection.remove({
                        'blazerid': blazerid
                    }, {
                        safe: true
                    }, function (err, result) {
                        if (err) {
                            res.send({
                                'error': 'An error has occurred - ' + err
                            });
                        } else {
                            console.log('' + result + ' document(s) deleted');
                            res.send(req.body);
                        }
                    });
                });
            }
        });
    });
}