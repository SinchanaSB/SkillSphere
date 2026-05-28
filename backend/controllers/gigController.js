const Gig = require('../models/Gig')

const createGig = async (req, res) => {
  try {
    const gig = await Gig.create({
      ...req.body,
      createdBy: req.user.id
    })

    res.status(201).json(gig)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getGigs = async (req, res) => {
  try {
    const gigs = await Gig.find()

    res.json(gigs)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  createGig,
  getGigs
}