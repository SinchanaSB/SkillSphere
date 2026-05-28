const mongoose = require('mongoose')

const userSchema =
  new mongoose.Schema(
    {
      name: String,

      email: {
        type: String,
        unique: true
      },

      password: String,

      role: {
        type: String,
        default:
          'freelancer'
      },

      skills: [String],

      profilePhoto: String,

      portfolio: [String],

      experience: Number,

      hourlyRate: Number,

      availability: Boolean,

      resume: String,

      certifications: [String],

      location: String,

      rating: {
        type: Number,
        default: 0
      }
    },
    { timestamps: true }
  )

module.exports =
  mongoose.model(
    'User',
    userSchema
  )