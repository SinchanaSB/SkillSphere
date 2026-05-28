const Proposal = require(
  '../models/Proposal'
)

const Notification = require(
  '../models/Notification'
)

/* ---------------- CREATE PROPOSAL ---------------- */

exports.createProposal =
  async (req, res) => {
    try {
      const proposal =
        await Proposal.create(
          req.body
        )

      /* CREATE NOTIFICATION */

      await Notification.create({
        userId:
          proposal.freelancerId,

        message:
          'New Proposal Submitted Successfully'
      })

      res.status(201).json({
        success: true,
        message:
          'Proposal Submitted',
        proposal
      })
    } catch (error) {
      console.log(error)

      res.status(500).json({
        success: false,
        message:
          'Proposal Failed'
      })
    }
  }

/* ---------------- GET PROPOSALS ---------------- */

exports.getProposals =
  async (req, res) => {
    try {
      const proposals =
        await Proposal.find().sort({
          createdAt: -1
        })

      res.json(proposals)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        success: false,
        message:
          'Error Fetching Proposals'
      })
    }
  }

/* ---------------- UPDATE PROPOSAL STATUS ---------------- */

exports.updateProposalStatus =
  async (req, res) => {
    try {
      const proposal =
        await Proposal.findByIdAndUpdate(
          req.params.id,
          {
            status:
              req.body.status
          },
          {
            new: true
          }
        )

      /* CREATE NOTIFICATION */

      await Notification.create({
        userId:
          proposal.freelancerId,

        message: `Your Proposal was ${req.body.status}`
      })

      res.json(proposal)
    } catch (error) {
      console.log(error)

      res.status(500).json({
        success: false,
        message:
          'Status Update Failed'
      })
    }
  }