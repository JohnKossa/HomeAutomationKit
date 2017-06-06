var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/HomeAutomation';

MongoClient.connect(url, function(err, db){
    if(err) {
        console.error("MongoDB_Core (startup): An error occurred while connecting to the database.");
        console.error(err);
    }else{
        console.log("Conntected to MongoDB instance.");
        db.close();
    }
});

var insertStatus = function(facts){
    return new Promise(function(resolve, reject){
        MongoClient.connect(url, function(err, db){
            if(err) {
                reject({type: "error", data: err, msg:"MongoDB_Core insertFacts: An error occurred while connecting to the database."});
            } else {
                var collection = db.collection('status');
                collection.insertMany(facts, function(err, result){
                    if(err){
                        reject({type: "error", data: err, msg: "MongoDB_Core insertFacts: An error occurred while inserting into collection."});
                    } else {
                        resolve(result);
                    }
                });
                db.close();
            }
        });
    });
};

var getStatus = function(params){
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject({type: "error", data: err, msg:"MongoDB_Core getFacts: An error occurred while connecting to the database."});
            } else {
                var collection = db.collection('status');
                collection.find(params).toArray(function (err, data) {
                    if (err) {
                        reject({type: "error", data: err, msg: "MongoDB_Core getFacts: An error occurred while inserting into collection."});
                    } else {
                        resolve(data);
                    }
                });
                db.close();
            }
        });
    });
};

var insertEvent = function(facts){
    return new Promise(function(resolve, reject){
        MongoClient.connect(url, function(err, db){
            if(err) {
                reject({type: "error", data: err, msg:"MongoDB_Core insertFacts: An error occurred while connecting to the database."});
            } else {
                var collection = db.collection('events');
                collection.insertMany(facts, function(err, result){
                    if(err){
                        reject({type: "error", data: err, msg: "MongoDB_Core insertFacts: An error occurred while inserting into collection."});
                    } else {
                        resolve(result);
                    }
                });
                db.close();
            }
        });
    });
};

var getEvent = function(params){
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject({type: "error", data: err, msg:"MongoDB_Core getFacts: An error occurred while connecting to the database."});
            } else {
                var collection = db.collection('events');
                collection.find(params).toArray(function (err, data) {
                    if (err) {
                        reject({type: "error", data: err, msg: "MongoDB_Core getFacts: An error occurred while inserting into collection."});
                    } else {
                        resolve(data);
                    }
                });
                db.close();
            }
        });
    });
};

module.exports = {
    insertStatus: insertStatus,
    getStatus: getStatus,
    insertEvent: insertEvent,
    getEvent: getEvent
};

