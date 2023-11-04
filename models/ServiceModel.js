const mongoose = require('mongoose');

// Define a schema for your data model
const serviceSchema = new mongoose.Schema({
  name: String,
  description: String,
  // Add more fields as needed
});

// Create a Mongoose model using the schema
const Service = mongoose.model('Service', serviceSchema);

// Export the model
module.exports = Service;
