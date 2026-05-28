const express = require('express')

const {
  createGig,
  getGigs
} = require('../controllers/gigController')

const protect = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/', protect, createGig)

router.get('/', getGigs)

module.exports = router