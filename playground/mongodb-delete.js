const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to Mongodb server ', err);
  }
  console.log('Connected to Mongodb server');

  //delete many, delete one, findOneAndDelete

//   db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
//     console.log(result);
//   });
// });

  // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Todos').findOneAndDelete({completed: true}).then((result) => {
  //   console.log(result);
  // });
  //
  // db.collection('User').deleteMany({name: 'Joneaux'}).then((results) => {
  //   console.log(results);
  // })

  db.collection('User').findOneAndDelete({
    _id: new ObjectID('59cfecd0d4e59eb6f5b6afe0')
  }).then((result) => {
    console.log(result);
  }, (err) => {
    console.log('Unable to delete user ', err);
  });
});
