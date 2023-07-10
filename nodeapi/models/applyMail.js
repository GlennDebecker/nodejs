const mongoose = require('mongoose');
const validator = require('validator');

const Groep2Schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 30
  },
  lastName: {
    type: String,
    maxlength: 30,
    required: true
  },
  birthday: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        // Add your email validation and extra security checks here
        // For example, you can use a package like "validator" to check if the email is valid
        const isValid = validator.isEmail(value);
        return isValid;
      },
      message: 'Invalid email address'
    }
  },
  country: {
    type: String,
    maxlength: 56, 
    required: true
  },
  gender: {
    type: String,
    maxlength: 20,
    default: "/"
  },
  accountCreated: {
    type: Date,
    default: Date.now
  }
  
});

module.exports = mongoose.model('Groep2', Groep2Schema);