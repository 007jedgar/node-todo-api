var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email : {
    type: String,
    required: true,
    trimmed: true,
    minlength: 3
  }
});

module.exports = {User};
