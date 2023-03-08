const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reservation = new Schema({
  nric: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  center: {
    type: Number,
    required: true
  },
  slot: {
    type: Date,
    required: true
  },
});

module.exports = Reservation = mongoose.model("RESERVATION", reservation);