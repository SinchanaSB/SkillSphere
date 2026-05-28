const express = require('express')

const router = express.Router()

const {
  createOrder,
  savePayment,
  getPayments
} = require(
  '../controllers/paymentController'
)

router.post(
  '/create-order',
  createOrder
)

router.post(
  '/save',
  savePayment
)

router.get(
  '/:id',
  getPayments
)

module.exports = router