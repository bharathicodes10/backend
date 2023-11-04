const mongoose = require('mongoose');
const User = require('./userModel'); // Import the User model
const Service = require('./ServiceModel'); // Import the Service model

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true }],
  bookingDate: { type: Date, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
