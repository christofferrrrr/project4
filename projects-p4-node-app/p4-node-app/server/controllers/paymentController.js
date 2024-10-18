import Payment from '../models/payment.js';

export const createPayment = async (req, res) => {
  const payment = new Payment(req.body);
  try {
    await payment.save();
    res.status(201).send(payment);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('bookingid');
    res.send(payments);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('bookingid');
    if (!payment) {
      return res.status(404).send({ message: 'Payment not found' });
    }
    res.send(payment);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!payment) {
      return res.status(404).send({ message: 'Payment not found' });
    }
    res.send(payment);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).send({ message: 'Payment not found' });
    }
    res.send({ message: 'Payment deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
};
