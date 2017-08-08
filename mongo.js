var mongodb = require('mongodb');

var { MongoClient, ObjectID } = mongodb;

// Connection URL
var mongoDbUrl = 'mongodb://localhost:27017/kamtohodit';

var handleError = (err) => {
  console.log("ERROR::MONGODB::error occured", err);
};

var performOperation = (collectionName, operationFunction) => {
  console.log('START - performOperation');

  // Connect to db
  var connectPromise = MongoClient.connect(mongoDbUrl);

  // Get the collection and perform the operation
  var operationPromise = connectPromise
    .then(db => db.collection(collectionName))
    .then(operationFunction);
  // .catch(handleError);

  // Close db connection when operation finishes
  operationPromise.then(() => {
    connectPromise.then(db => db.close());
  })

  return operationPromise;
}

// -----------------------------------------------------------------------------


module.exports = mymongo = {

  // See: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
  find: (collectionName, findOptions) => {
    console.log(`START - mymongo.find("${collectionName}", ${findOptions})`);
    return performOperation(collectionName, (collection) => {

      var cursor;

      if (findOptions) {
        // perform the find
        cursor = collection.find(findOptions.query, findOptions.projection);

        // sort the results
        if (findOptions.map) { cursor.map(findOptions.map); }
        if (findOptions.sort) { cursor.sort(findOptions.sort); }

        // pagination
        // if (findOptions.skip) { cursor.skip(findOptions.skip); }
        // if (findOptions.limit) { cursor.limit(findOptions.limit); }

      } else {
        cursor = collection.find({});
      }
      var documentsArrayPromise = cursor.toArray();
      //documentsArrayPromise.then((data) => { console.log('found data: ', data); })
      return documentsArrayPromise;

    });
  },

  findOne: (collectionName, findOptions) => {
    console.log(`START - mymongo.find("${collectionName}", ${JSON.stringify(findOptions)})`);
    return performOperation(collectionName, (collection) => {

      // See: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOne
      var documentPromise = collection.findOne(findOptions.query);
      return documentPromise;

    });
  },

  listAll: (collectionName) => {
    return mymongo.find(collectionName);
  },

}
