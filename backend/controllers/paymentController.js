const Razorpay = require('razorpay')

const Payment = require('../models/Payment')

const razorpay =
  new Razorpay({
    key_id:
      process.env.RAZORPAY_KEY,

    key_secret:
      process.env.RAZORPAY_SECRET
  })

exports.createOrder =
  async (req, res) => {
    try {
      const options = {
        amount:
          req.body.amount * 100,

        currency: 'INR'
      }

      const order =
        await razorpay.orders.create(
          options
        )

      res.json(order)
    } catch (error) {
      res.status(500).json({
        message:
          'Payment Failed'
      })
    }
  }

exports.savePayment =
  async (req, res) => {
    try {
      const payment =
        await Payment.create(
          req.body
        )

      res.json(payment)
    } catch (error) {
      res.status(500).json({
        message:
          'Save Failed'
      })
    }
  }

exports.getPayments =
  async (req, res) => {
    try {
      const payments =
        await Payment.find({
          userId:
            req.params.id
        })

      res.json(payments)
    } catch (error) {
      res.status(500).json({
        message:
          'Fetch Failed'
      })
    }
  }