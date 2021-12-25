// requires the mongodb node.js driver and imported the MongoClient object from it
const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

// sets up a connection to the mongodb server using the port number
const url = 'mongodb://localhost:27017/';

// the name of the database connecting to
const dbname = 'nucampsite';

// use connect method to connect mongodb client to the mongodb server
MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {
    // if connect() promise resolves .then() returns client object used to access the nucampsite database

    console.log('Connected correctly to server');
    
    // client.db method will connect to nucampsite database on mongodb server
    const db = client.db(dbname);

    // delete all documents in the campsite's collection to start with a blank collection for each test
    db.dropCollection('campsites').then(result => {
        
        // if dropCollection() promise resolves .then() logs message. Result is true
        console.log('Dropped Collection:', result);
    })
    .catch(err => console.log('No collection to drop.'));
    // if promise is rejected, log message, and code still continues

    // insert document in the collection
    dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites')
    .then(result => {
        // ops will contain an array of the inserted document
        console.log('Insert Document:', result.ops);

        // the findDocuments method from operations.js
        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        // the updateDocument method from operations.js
        return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test Description" }, 'campsites');
    })
    .then(result => {
        // logs how many documents were updated, which should be 1
        console.log('Updated Document Count:', result.result.nModified);

        // logs all documents in the collection to confirm updateDocument was successful
        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);
        
        return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" },
            'campsites')
    })
    .then(result => {
        console.log('Deleted Document Count:', result.deletedCount);

        // close client's connection to mongodb server
        return client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
})
.catch(err => console.log(err));
// if connect() promise fails, .catch() runs