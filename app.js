const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
const mongoose = require('mongoose');
const User = require('./models/userModel');
const Service=require('./models/ServiceModel')
const Booking = require('./models/BookingModel');
require('dotenv').config(); // Load environment variables

// Get MongoDB connection URL from .env
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.post('/api/register', async (req, res) => {
  console.log('Received a registration request');
  const userData = req.body;
  console.log('Received data:', userData);

  try {
    // Check if the user already exists (you can also validate user data here)
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log("user exists!");
      res.json({ success: false, message: 'User already exists.' });
    } else {
      // Create a new user instance
      const newUser = new User(userData);
      console.log("success!");
      // Save the user to the database
      await newUser.save();

      res.json({ success: true, message: 'Registration successful' });
    }
  } catch (error) {
    console.error('Registration failed:', error);
    res.status(500).json({ success: false, message: 'Registration failed' });
  }
});


app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(401).json({ success: false, message: 'User not found' });
      return;
    }

    // Check if the provided password matches the stored password (you should use a secure password hashing library)
    if (user.password !== password) {
      res.status(401).json({ success: false, message: 'Password incorrect' });
      return;
    }

    // If both email and password are correct, return a success response
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

//Booking services

// Get a list of available services
// Get a list of available services
app.get('/api/services', async (req, res) => {
  try {
    // Fetch the list of services from the database
    //console.log("Nice to see you!")
    const services = await Service.find();
    res.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ success: false, message: 'Error fetching services' });
  }
});

// Create a booking
app.post('/api/bookings', async (req, res) => {
  const { userId, email, services, bookingDate } = req.body;

  try {
    // Create a new booking instance
    const newBooking = new Booking({
      userId,
      email,
      services, // An array of selected service IDs
      bookingDate,
    });

    // Save the booking to the database
    await newBooking.save();

    res.json({ success: true, message: 'Booking successful' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, message: 'Error creating booking' });
  }
});



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
