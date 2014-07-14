var config = require('./config.js');

var ntwitter = require('ntwitter');
var mongo_client = require('mongodb').MongoClient;
var _ = require('underscore');


mongo_client.connect('mongodb://127.0.0.1/'+config.mongo_db_name, function(err, db){
    if(err) throw err;
    
    init(db);
});

function init(db) {
    twitter = new ntwitter(config.twitter);
    var collection = db.collection(config.mongo_collection);
    twitter.stream('statuses/filter', {
        track: config.hashtags
    }, function(stream){
        stream.on('data', function(result) {
            collection.insert(result, function(err, result){});
           //console.log(result.text);
        });
        
        stream.on('error', function(err) {
            console.log(err);
        });
    });
}