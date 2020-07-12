const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operation');

const url = 'mongodb://localhost:27017/';
const dbname = 'myServer';

MongoClient.connect(url, (err,client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    dboper.insertDocument(db, {name:"samosa", description:"Test"}, 'junkfood', (result) => {

        console.log("Insert Document:\n", result.ops);

        dboper.findDocuments(db, "junkfood", (docs) => {
            console.log("Found Documents:\n", docs);

            dboper.updateDocument(db, {name:"samosa"}, { description: "Updated Test" },"junkfood", (result) => {

                console.log("Updated Document:\n", result.result);

                dboper.findDocuments(db, "junkfood", (docs) => {
                    console.log("Found Documents:\n", docs);

                    db.dropCollection("dishes", (result) => {
                        console.log("Dropped Collection: ", result);

                                client.close();

                    });

                });



            });

        });


    });

});