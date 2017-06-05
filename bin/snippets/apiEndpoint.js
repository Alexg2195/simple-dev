module.exports = function(endPtName) {
  var endPtNameCAPS = (endPtName.charAt(0).toUpperCase() + endPtName.slice(1));
  return `\
var express = require(\'express\');
var router = express.Router();
var ${endPtNameCAPS} = require(\'../models/${endPtName}\');

router.get(\'/\', (req, res) => {
  ${endPtNameCAPS}.find({
  },(err, docs) => {
    if (err) {
      res.send(err);
    } else {
      res.send(docs);
    }
  });
});

router.get(\'/:id\', (req, res) => {
  ${endPtNameCAPS}.findById(req.params.id, (err, doc) => {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

router.post(\'/\', (req, res) => {
  var new${endPtNameCAPS} = new ${endPtNameCAPS}(req.body);
  new${endPtNameCAPS}.save((err, doc) => {
    if (err) {
      res.send(err);
    } else {
      res.send(doc);
    }
  });
});

router.put(\'/:id\', (req, res) => {
  ${endPtNameCAPS}.findById(req.params.id, (err, doc) => {
    if (err) {
      res.send(err);
    }
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

router.delete(\'/:id\', (req, res) => {
  ${endPtNameCAPS}.remove({_id: req.params.id}, (err) => {
    if (err)
      res.send(err);
    else {
      res.send(\'Delete Successful\');
    }
  });
});

module.exports = router;`
}
