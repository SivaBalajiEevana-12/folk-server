const mongoose= require("mongoose");
const GitaSessionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  whatsappNumber: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    min: 0,
    max: 150,
  },
  collegeOrWorking: {
    type: String,
    enum: ['College', 'Working', 'Other'],
  },
  place: {
    type: String,
    trim: true,
  },
  selectedBook: {
    type: String,
    required: false, // Optional for now
  },
  interestedInGitaSession: {
    type: Boolean,
    required: true,
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = mongoose.model('GitaSessionParticipant', GitaSessionSchema);