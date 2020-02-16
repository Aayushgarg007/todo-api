var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser')

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use('/api/todos', todoRoutes);

// we can also use res.json() method to send json from our server
// instead of res.send()
app.get('/', (req, res) => {
  res.sendFile('index.js');
});

app.listen(port, () => {
  console.log('Server started on port', port);
});