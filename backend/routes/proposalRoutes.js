const express = require('express')

const router =
  express.Router()

const {
  createProposal,
  getProposals
} = require(
  '../controllers/proposalController'
)

router.post(
  '/',
  createProposal
)

router.get(
  '/',
  getProposals
)

module.exports = router