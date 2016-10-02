module.exports = {
  newEndPt: function (endpointName) {

  }
}


module.exports = {

var mongoose = require('mongoose');

var User = require('../models/users');
var Todo = require('../models/todos');


router.get('/todos/all', (req, res) => {
  Todo.find({
  },(err, docs) => {
    res.send(docs);
  });
});

router.post('/todos', (req, res) => {
  console.log(req.body);
  var todo = new Todo({todo: req.body.todo, user: mongoose.Types.ObjectId( req.body.user )});
  todo.save((err, doc) => {
    if (err) return console.log(err);
    res.send({
        msg:"state successul!",
        data:doc
    });
  });
});

router.put('/todos/:todo_id', (req, res) => {
  // console.log(req.body);
  Todo.findById(req.params.todo_id, (err, todo) => {
    if (err)
      res.send(err);
    // console.log(`todo: ${todo.todo}`)
    // console.log(`body todo: ${req.body.todo}`)
    todo.todo = req.body.todo;
    todo.save((err, doc) => {
      if (err) return console.log(err);
      res.send({
          msg:"state successul!",
          data:doc
      });
    });
  });
});

router.delete('/todos/:todo_id', (req, res) => {
  // console.log(req.body);
  Todo.remove({_id: req.params.todo_id}, (err) => {
    if (err)
      res.send(err);
    else {
      res.send('Deleted Todo');
    }
  });
});

// router.post('/post/create', function(req, res) {
//   res.send(SOMETHING);
// });
