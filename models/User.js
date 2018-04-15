const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: 'Enter e-mail',
    unique: 'This e-mail exists',
    validate: {
      validator(value) {
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regexEmail.test(value);
      },
      message: 'Invalid email'
    }
  },
  password: {
    type: String,
    required: 'Minimum 6 characters',
    set: password => crypto.pbkdf2Sync(password, 'salt', 1, 128, 'sha1')
  },
  salt: String,
  growth: {
    type: Number,
    required: 'Enter growth',
    min: 100,
    max: 200
  },
  weight: {
    type: Number,
    required: 'Enter weight',
    min: 20,
    max: 200
  },
  age: {
    type: Number,
    required: 'Enter age',
    min: 1,
    max: 100
  },
  physicalActivity: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  baseMetabolism: {
    type: Number,
    set: v => v.toFixed(0)
  },
  dailyMetabolism: {
    type: Number,
    set: v => v.toFixed(0)
  }
}, {
  timestamps: true
});

userSchema.methods.checkPassword = function(password) {
  if (!password) return false;
  return crypto.pbkdf2Sync(password, 'salt', 1, 128, 'sha1') == this.password;
};

module.exports = mongoose.model('User', userSchema);
