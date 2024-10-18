// models/Facility.js
import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  availability: { type: Boolean, default: true },
  timeSlots: { type: [String], default: [] } // e.g., ['2:00 PM', '3:00 PM']
});

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;
