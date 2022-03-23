const mongoose = require("mongoose");
const { isNumberObject } = require("util/types");

const User = mongoose.model(
  'User', 
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 20
  },
  phoneNumber: {
      type: Number,
      required: true,
      min: 3,
      max: 20
  },
  nationalIdentityNumber: {
      type: Number,
      required: true,
      min: 11,
      max: 11,
      unique: true
  },
  location: {
      type: String,
      required: true,
      max: 50
  },
  password: {
      type: String,
      required: true,
      min: 8,
      unique: true
  }
  }, {timestamps: true})
);

module.exports = User;