import mongoose from "mongoose";

// Define the schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
    trim: true,    
  },
  email: {
    type: String,
    required: true,
    unique: true,    
    lowercase: true, 
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,    // Minimum length for password
  },
  age: {
    type: Number,
    min: 0,          // Minimum value for age
    max: 120,        // Maximum value for age
  },
  isAdmin: {
    type: Boolean,
    default: false,  // Default value is false
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date
  },
});

// Create the model
const User = mongoose.model('User', userSchema);

export default User;
