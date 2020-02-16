var mongoose = require('mongoose');
mongoose.set('debug', true);
// debug =true, this will allow us to see when there is changes in DB
mongoose.connect('mongodb://localhost/todo-api');

// allow us to use promise syntax
// means we can use .then() and .catch() handlers rather than passing callback function
mongoose.Promise = Promise;

module.exports.Todo = require('./todo');