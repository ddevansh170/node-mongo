const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'myServer';

MongoClient.connect(url, (err,client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    const collection = db.collection('junkfood');

    collection.insertOne({ "name":"Burger", "description":"Test"}, (err,result) => {
        assert.equal(err,null);

        console.log("After Insert:\n");
        console.log(result.ops);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err,null);

            console.log("Found:\n");
            console.log(docs);

            db.dropCollection('junkfood',(err, result) => {
                assert.equal(err, null);

                client.close();

            });
        });

    });

});