module.exports = function(endPtName) {
  var endPtNameCAPS = (endPtName.charAt(0).toUpperCase() + endPtName.slice(1));
  return `\
var mongoose = require('mongoose');
var ${endPtNameCAPS} = require('../models/${endPtNameCAPS}');

router.get('/${endPtName}', (req, res) => {
  ${endPtNameCAPS}.find({
  },(err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.send(docs);
    }
  });
});

router.get('/${endPtName}/:id', (req, res) => {
  ${endPtNameCAPS}.findById(req.params.id, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

router.post('/${endPtName}', (req, res) => {
  var ${endPtName} = new ${endPtNameCAPS}({data: req.body.data});
  ${endPtNameCAPS}.save((err, doc) => {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

router.put('/${endPtName}/:id', (req, res) => {
  ${endPtNameCAPS}.findById(req.params.id, (err, doc) => {
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

router.delete('/${endPtName}/:id', (req, res) => {
  ${endPtNameCAPS}.remove({_id: req.params.id}, (err) => {
    if (err)
      res.send(err);
    else {
      res.send('Delete Successful');
    }
  });
});`
}
