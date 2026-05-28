const mongoose = require('mongoose')

const proposalSchema =
  new mongoose.Schema(
    {
      gigId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: 'Gig'
      },

      freelancerId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: 'User'
      },

      proposalText: String,

      bidAmount: Number,

      duration: String,

      status: {
        type: String,
        default: 'pending'
      }
    },
    { timestamps: true }
  )

module.exports =
  mongoose.model(
    'Proposal',
    proposalSchema
  )