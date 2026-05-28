const mongoose = require('mongoose')

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    budget: {
      type: Number,
      required: true
    },

    skillsRequired: [
      {
        type: String
      }
    ],

    location: {
      type: String
    },

    createdBy: {
      type:
        mongoose.Schema.Types
          .ObjectId,

      ref: 'User'
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model(
  'Gig',
  gigSchema
)