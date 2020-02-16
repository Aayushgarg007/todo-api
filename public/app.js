// .ready() method wait for the DOM to render first then call the callback function
$(document).ready(function(){
  // here path is relative path
  // GET all todos
  $.getJSON('/api/todos')
  .then(addTodos)

  // CREATE todo
  $('#todoInput').keypress(function(event){
    if(event.which == 13){
      createTodo();
    }
  });

  // UPDATE todo
  $('.list').on('click', 'li', function(){
    updateTodo($(this));
  });

  // REMOVE todo
  $('.list').on('click', 'span', function(e){
    e.stopPropagation();
    removeTodo($(this).parent());
  });
});

function addTodos(todos) {
  // add todos to the page here
  todos.forEach(todo => {
    addTodo(todo);
  });
}

function addTodo(todo) {
  var newTodo = $('<li class="task">' + todo.name + ' <span>X</span></li>');
  newTodo.data('id', todo._id);
  newTodo.data('completed', todo.completed);
  if(todo.completed){
    newTodo.addClass('done');
  }
  $('.list').append(newTodo);
}

function createTodo() {
  var usrInput = $('#todoInput').val();
  $.post('/api/todos', {name: usrInput})
  .then(function(newTodo){
    $('#todoInput').val('');
    addTodo(newTodo);
  })
  .catch(function(err){
    console.log(err);
  })
}

function removeTodo(todo) {
  var clickedId = todo.data('id');
  var deleteUrl = '/api/todos/' + clickedId;
  $.ajax({
    method: 'DELETE',
    url: deleteUrl
  })
  .then(function(data){
    todo.remove();
  })
  .catch(function(err){
    console.log(err);
  })
}

function updateTodo(todo) {
  var updateUrl = '/api/todos/' + todo.data('id');
  var isDone = !todo.data('completed');
  var updateData = {completed: isDone}
  $.ajax({
    method: 'PUT',
    url: updateUrl,
    data: updateData
  })
  .then(function(updatedTodo){
    todo.toggleClass('done');
    todo.data('completed', isDone);
  })
  .catch(function(err){
    console.log(err);
  })
}