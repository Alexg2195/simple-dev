module.exports = function(endPtName) {
  var endPtName = (endPtName.charAt(0).toUpperCase() + endPtName.slice(1)).slice(0,endPtName.length-1);
  return `\
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ${endPtName}Schema = new Schema({
  data: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


var ${endPtName} = mongoose.${endPtName}('${endPtName}', ${endPtName}Schema);
module.exports = ${endPtName};`
}
