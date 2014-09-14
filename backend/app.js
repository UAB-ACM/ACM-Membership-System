var express = require('express'),
    cors = require('cors'),
    config = require('./config.json'),
    app = express(),
    mongo = require('mongodb');

app.use(cors());

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var mongo_server = new Server(config.mongo_server, config.mongo_port, {
    auto_reconnect: true
});

db = new Db('members', mongo_server);

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'membersdb' database");
        db.collection('members', {
            strict: true
        }, function (err, collection) {
            if (err) {
                console.log("The 'members' collection doesn't exist.");
            }
        });
    }
});

app.checkKey = function (key, res, callback) {

    db.collection('keys', function (err, collection) {
        collection.findOne({
            'key': key
        }, function (err, item) {
            if (item) {
                callback();
            } else {
                res.send({
                    error: "Invalid key."
                });
            }
        });
    });
};

require('./routes/login')(app, db, config);
require('./routes/members')(app, db, config);
require('./routes/mail')(app, db, config);
require('./routes/expired')(app, db, config);
require('./routes/settings')(app, db, config);

app.listen(config.port);
console.log('Listening on port ' + config.port + '...');