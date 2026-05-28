const mongoose = require('mongoose')

const reviewSchema =
  new mongoose.Schema(
    {
      freelancerId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: 'User'
      },

      reviewerId: {
        type:
          mongoose.Schema.Types
            .ObjectId,

        ref: 'User'
      },

      rating: Number,

      comment: String
    },
    { timestamps: true }
  )

module.exports =
  mongoose.model(
    'Review',
    reviewSchema
  )