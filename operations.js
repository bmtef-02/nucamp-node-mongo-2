// method to insert document
exports.insertDocument = (db, document, collection) => {
    
    // allows us to access a specific collection in the mongodb server
    const coll = db.collection(collection);
    
    // insertOne() method will auto return the method's result in a promise if no callback
    return coll.insertOne(document);
};

// method to list all documents
exports.findDocuments = (db, collection) => {
    const coll = db.collection(collection);

    // find() method will auto return the method's result in a promise if no callback
    return coll.find().toArray();
};

// method to remove a document
exports.removeDocument = (db, document, collection) => {
    const coll = db.collection(collection);
    
    // deleteOne() method will auto return the method's result in a promise if no callback
    return coll.deleteOne(document);
};

// method to update a document
exports.updateDocument = (db, document, update, collection) => {
    const coll = db.collection(collection);
    
    // $set is a mongodb set operator that uses the update object to write over existing info
    // method will auto return the method's result in a promise if no callback
    return coll.updateOne(document, { $set: update }, null);
};
