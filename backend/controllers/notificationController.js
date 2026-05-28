const Notification = require(
  '../models/Notification'
)

exports.createNotification =
  async (req, res) => {
    try {
      const notification =
        await Notification.create(
          req.body
        )

      res.status(201).json(
        notification
      )
    } catch (error) {
      res.status(500).json({
        message:
          'Notification Failed'
      })
    }
  }

exports.getNotifications =
  async (req, res) => {
    try {
      const notifications =
        await Notification.find({
          userId:
            req.params.id
        }).sort({
          createdAt: -1
        })

      res.json(notifications)
    } catch (error) {
      res.status(500).json({
        message:
          'Error Fetching Notifications'
      })
    }
  }

exports.markAsRead =
  async (req, res) => {
    try {
      const notification =
        await Notification.findByIdAndUpdate(
          req.params.id,
          {
            read: true
          },
          { new: true }
        )

      res.json(notification)
    } catch (error) {
      res.status(500).json({
        message:
          'Update Failed'
      })
    }
  }