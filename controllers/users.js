var mongoose = require('mongoose');
var Users = require('../models/users');

router.get('/users', (req, res) => {
  Users.find({
  },(err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.send(docs);
    }
  });
});

router.get('/users/:id', (req, res) => {
  Users.findById(req.params.id, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

router.post('/users', (req, res) => {
  var users = new Users({data: req.body.data});
  Users.save((err, doc) => {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

router.put('/users/:id', (req, res) => {
  Users.findById(req.params.id, (err, doc) => {
    if (err) return console.log(err);
    doc.data = req.body.data;
    doc.save((err, doc) => {
      if (err) {
        res.send(err);
      } else {
        res.send(doc);
      }
    });
  });
});

router.delete('/users/:id', (req, res) => {
  Users.remove({_id: req.params.id}, (err) => {
    if (err)
      res.send(err);
    else {
      res.send('Delete Successful');
    }
  });
});
