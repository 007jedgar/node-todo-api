const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to Mongodb server ', err);
  }
  console.log('Connected to Mongodb server');

  db.collection('User').findOneAndUpdate({
    _id: new ObjectID("59d03061ab88592afb80b794")
  }, {
    $set: {
      name: 'Jonathan'
    },
    $inc: {
      age: -1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

});
