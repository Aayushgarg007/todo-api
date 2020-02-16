var db = require('../models');

exports.getTodos = (req, res)=> {
  db.Todo.find()
  .then(todos => {
    res.json(todos);
  })
  .catch(err => {
    res.send(err);
  })
}

exports.createTodo = (req, res) => {
  db.Todo.create(req.body)
  .then(newTodo => {
    res.status(201).json(newTodo);
    // we can explicity send status code
    // 201 status code implies something was created
  })
  .catch(err => {
    res.send(err);
  })
}

exports.getTodo = (req, res) => {
  db.Todo.findById(req.params.todoid)
  .then(foundTodo => {
    res.json(foundTodo);
  })
  .catch(err => {
    res.send(err);
  });
}

exports.updateTodo = (req, res) => {
  db.Todo.findOneAndUpdate({_id: req.params.todoid}, req.body, {new: true})
  .then(todo => {
    res.json(todo);
  })
  .catch(err => {
    res.send(err);
  });
}
// by default mongo returns data before updation
// if we pass {new: true} as 3rd parameter then mongo will return updated data

exports.deleteTodo = (req, res) => {
  db.Todo.remove({_id: req.params.todoid})
  .then(() => {
    res.json({message: 'We deleted it!'});
  })
  .catch(err => {
    res.send(err);
  });
}

module.exports = exports;