import express from 'express';
import { 
  createBooking, 
  getBookings, 
  getBookingById, 
  updateBooking, 
  deleteBooking, 
  getAvailableSlots 
} from '../controllers/bookingController.js';

const router = express.Router();

// Route to get all bookings
router.get('/', getBookings);

// Route to get available slots for a facility on a specific date
router.get('/available-slots', getAvailableSlots);

// Route to get a specific booking by ID
router.get('/:id', getBookingById);

// Route to create a new booking
router.post('/', createBooking);

// Route to update a booking by ID
router.put('/:id', updateBooking);

// Route to delete a booking by ID
router.delete('/:id', deleteBooking);

export default router;
