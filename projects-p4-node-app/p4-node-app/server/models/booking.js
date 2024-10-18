import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  facilityid: { type: mongoose.Schema.Types.ObjectId, ref: 'Facility', required: true },
  date: { type: Date, required: true },
  starttime: { type: Date, required: true }, // Changed to Date type
  endtime: { type: Date, required: true },   // Changed to Date type
  iscancelled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// Custom method to check if a booking overlaps with another
bookingSchema.methods.isOverlapping = function (start, end) {
  const thisStart = this.starttime;
  const thisEnd = this.endtime;
  return (start < thisEnd && end > thisStart);
};

export default mongoose.model('Booking', bookingSchema);
