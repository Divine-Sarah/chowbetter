const mongoose = require("mongoose");

const Farmer = mongoose.model(
  'Farmer', 
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      min: 20
    },
  phoneNumber: {
    type: String,
    required: true,
    min: 3,
    max: 13,
    unique: true
  },
  nationalIdentityNumber: {
    type: String,
    required: true,
    min: 11,
    max: 13,
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
  },
  typeOfProduce: {
    type: String,
    required: true,
  },

  }, {timestamps: true})
);

module.exports = Farmer;