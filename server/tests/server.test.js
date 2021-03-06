const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
    .post('/todos')
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('Should not create todo with invalid body data', (done) => {
    var text = 'Text todo text';

    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2)
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('Should get all todos', (done) => {
      request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/_id', () => {

  it('Should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('Should return 404 for non-object ids', (done) => {
    request(app)
      .get(`/todos/123abc`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .get(`/todos/hexId`)
      .expect(404)
      .end(done);
  });
});

describe('DELETE /todos/_id', () => {

  it('Should remove a todo ', (done) => {
    var hexId = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.findById(hexId).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((err) => done(err));
      });
  });

  it('Should return 404 if todo not found', (done) => {
    var hexId = new ObjectID().toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 if ObjectId is invalid', (done) => {
    request(app)
      .delete('/todos/123abc')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {

  it('PATCH /todos/:id', (done) => {
    var id = todos[0]._id.toHexString();
    var text = 'patch test text'
    request(app)
      .patch(`/todos/${id}`)
      .send({
        text,
        completed: true })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true)
        expect(res.body.todo.completedAt).toBeA('number')
      })
      .end(done);
  });

  it('Should clear completedAt when todo is false', (done) => {
    var id = todos[1]._id.toHexString();
    var text = 'patch test text'
    request(app)
      .patch(`/todos/${id}`)
      .send({
        text,
        completed: false })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end(done);
  });
});

describe('GET /users/me', () => {
  it('Should authenticate a new user', (done) => {
    
  })
});

  // it('should return a 401 if not authenticated', (done) => {
  //
  // });
});



//Space
