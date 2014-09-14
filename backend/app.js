var express = require('express'),
    cors = require('cors');

var app = express();

app.use(cors());

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
});

var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {
    auto_reconnect: true
});

db = new Db('members', server);

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

var config = require('./config.json');

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

app.listen(3000);
console.log('Listening on port 3000...');