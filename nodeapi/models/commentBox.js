const mongoose = require('mongoose');
const validator = require('validator');

const commentSection = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    maxlength: 30
  },
  textBox: {
    type: String,
    maxlength: 500,
    required: true
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        const isValid = validator.isEmail(value);
        return isValid;
      },
      message: 'Invalid email address'
    }
  },
});

module.exports = mongoose.model('Comment1', commentSection);