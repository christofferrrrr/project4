import Booking from '../models/booking.js';
import Facility from '../models/facility.js';

// Get available time slots for a specific facility and date
export const getAvailableSlots = async (req, res) => {
  const { facilityId, date } = req.query;

  // Parse the date to remove the time part
  const bookingDate = new Date(date);
  const startOfDay = new Date(bookingDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(bookingDate.setHours(23, 59, 59, 999));

  try {
    // Get all bookings for the specified date and facility
    const bookings = await Booking.find({
      facilityid: facilityId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    const bookedSlots = bookings.map(booking => booking.starttime);
    
    // Define the available slots (e.g., from 9 AM to 9 PM)
    const allSlots = [];
    for (let hour = 9; hour < 21; hour++) { // Assuming 9 AM to 9 PM slots
      const slot = `${hour < 10 ? '0' + hour : hour}:00`; // Format hour
      if (!bookedSlots.includes(slot)) {
        allSlots.push(slot); // Add to available slots if not booked
      }
    }
    
    res.send(allSlots);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Helper function to check availability for a given time range
const checkAvailability = async (facilityId, date, startTime, endTime) => {
  const bookings = await Booking.find({
    facilityid: facilityId,
    date, 
    $or: [
      { starttime: { $lt: endTime, $gte: startTime } }, // Booking overlaps with the start time
      { endtime: { $gt: startTime, $lte: endTime } },   // Booking overlaps with the end time
    ],
  });

  return bookings.length === 0; // Return true if no overlaps found
};

// Create a new booking
export const createBooking = async (req, res) => {
  const { facilityid, starttime, endtime, phone, paymentMethod } = req.body;

  try {
    // Check if the booking time is strictly on the hour
    const startHour = new Date(starttime).getHours();
    const endHour = new Date(endtime).getHours();

    if (startHour !== endHour - 1) {
      return res.status(400).send({ message: 'Bookings must be for a flat hour only.' });
    }

    // Check if the facility is available for the requested time
    const isAvailable = await checkAvailability(facilityid, starttime, endtime);
    if (!isAvailable) {
      return res.status(400).send({ message: 'The facility is already booked during this time.' });
    }

    const booking = new Booking({
      facilityid,
      starttime,
      endtime,
      phone,
      paymentMethod,
      date: new Date(starttime).toISOString().split('T')[0], // Store the booking date
      userid: req.body.userid // Add user ID from request
    });
    
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('facilityid').populate('userid');
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single booking by ID
export const getBookingById = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await Booking.findById(id).populate('facilityid').populate('userid');
    if (!booking) {
      return res.status(404).send({ message: 'Booking not found' });
    }
    res.send(booking);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update booking
export const updateBooking = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, updates, { new: true });
    res.send(updatedBooking);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    await Booking.findByIdAndDelete(id);
    res.send({ message: 'Booking deleted successfully.' });
  } catch (error) {
    res.status(400).send(error);
  }
};