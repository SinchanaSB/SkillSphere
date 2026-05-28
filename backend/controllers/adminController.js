const User = require('../models/User')

const Gig = require('../models/Gig')

const Proposal = require(
  '../models/Proposal'
)

const Review = require(
  '../models/Review'
)

exports.getAnalytics =
  async (req, res) => {
    try {
      const totalUsers =
        await User.countDocuments()

      const totalGigs =
        await Gig.countDocuments()

      const totalProposals =
        await Proposal.countDocuments()

      const totalReviews =
        await Review.countDocuments()

      res.json({
        totalUsers,
        totalGigs,
        totalProposals,
        totalReviews
      })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        message:
          'Analytics Error'
      })
    }
  }