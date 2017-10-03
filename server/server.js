const {ObjectId} = require('mongodb');

var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} =require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require( './models/user');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
//POST Request
app.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});
//GET Requests
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.sendStatus(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
    }).catch((e) => {
    res.status(400).send();
  });
});

//DELETE request
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.send.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});
//Basically a launch server
app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};




 // space
