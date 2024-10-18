import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  bookingid: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  amount: Number,
  paymentmethod: String,
  status: { type: String, enum: ['pending', 'completed', 'failed'] },
  paymentdate: Date
});

export default mongoose.model('Payment', paymentSchema);
