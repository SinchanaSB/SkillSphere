const User = require(
  '../models/User'
)

exports.updateProfile =
  async (req, res) => {
    try {
      const updatedUser =
        await User.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        )

      res.json(updatedUser)
    } catch (error) {
      res.status(500).json({
        message:
          'Profile Update Failed'
      })
    }
  }

exports.getProfile =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.params.id
        )

      res.json(user)
    } catch (error) {
      res.status(500).json({
        message:
          'Error Fetching Profile'
      })
    }
  }