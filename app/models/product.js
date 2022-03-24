const mongoose = require("mongoose");

const Product = mongoose.model(
  'Product', 
  new mongoose.Schema({
    nameOfItem: {
      type: String,
      required: true
    },
  dateHarvested: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  possibleDateOfSpoilage: {
    type: String,
    required: true
  },
  productImage:{
      type: String,
      required: true
  }
  }, {timestamps: true})
);

module.exports = Product;