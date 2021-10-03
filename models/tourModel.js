const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name is required"],
  },
  photo: String,
  description: {
    type: String,
    required: [true, "description is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const tour = mongoose.model("tour", tourSchema);

module.exports = tour;
