import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../style/BookingModal.css';

const BookingModal = ({ facility, onClose, user }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');

  // Fetch user information
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user && user._id) {
        try {
          const response = await axios.get(`http://localhost:3000/api/users/${user._id}`);
          setUserInfo({
            name: response.data.name,
            email: response.data.email,
            phone: response.data.phone || '',
          });
        } catch (error) {
          console.error('Error fetching user info:', error);
        }
      }
    };
    fetchUserInfo();
  }, [user]);

  // Generate available time slots based on selected date
  useEffect(() => {
    const generateAvailableSlots = async () => {
      if (facility && selectedDate) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/bookings/available-slots?facilityId=${facility._id}&date=${selectedDate.toISOString().split('T')[0]}`
          );
          setAvailableSlots(response.data);
        } catch (error) {
          console.error('Error fetching available slots:', error);
        }
      }
    };
    generateAvailableSlots();
  }, [facility, selectedDate]);

  // Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    const bookingData = {
      userid: user._id,
      facilityid: facility._id,
      date: selectedDate,
      starttime: selectedTime,
      endtime: `${parseInt(selectedTime.split(':')[0]) + 1}:00`,
      phone: userInfo.phone,
      paymentMethod: paymentMethod,
    };

    try {
      await axios.post('http://localhost:3000/api/bookings', bookingData);
      alert('Booking successful!');
      onClose();
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Book {facility?.facilityname}</h2>
        <form onSubmit={handleBooking}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={userInfo.name}
              readOnly
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={userInfo.email}
              readOnly
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label>Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-input"
              required
            >
              <option value="cash">Cash</option>
              <option value="card">Card</option>
              <option value="e-wallet">E-Wallet</option>
            </select>
          </div>
          <div className="form-group">
            <label>Select Date</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              inline
            />
          </div>
          <div className="form-group">
            <label>Select Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="form-input"
              required
            >
              <option value="">Select a time</option>
              {availableSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn-submit">
            Confirm Booking
          </button>
          <button type="button" onClick={onClose} className="btn-cancel">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;