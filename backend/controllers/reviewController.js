const Review = require(
  '../models/Review'
)

exports.createReview =
  async (req, res) => {
    try {
      const review =
        await Review.create(
          req.body
        )

      res.status(201).json(
        review
      )
    } catch (error) {
      res.status(500).json({
        message:
          'Review Failed'
      })
    }
  }

exports.getReviews =
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          freelancerId:
            req.params.id
        })

      res.json(reviews)
    } catch (error) {
      res.status(500).json({
        message:
          'Error Fetching Reviews'
      })
    }
  }