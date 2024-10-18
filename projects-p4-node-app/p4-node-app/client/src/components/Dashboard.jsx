// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookingModal from './BookingModal'; // Import your modal component

const Dashboard = ({ user }) => {
  const [facilities, setFacilities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/facilities');
      console.log(response.data); // Log the fetched data
      setFacilities(response.data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  // Fetch available time slots for the selected facility and date
  const fetchAvailableSlots = async (facilityId, date) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/bookings/available-slots?facilityId=${facilityId}&date=${date}`);
      setAvailableSlots(response.data); // Set available slots
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  useEffect(() => {
    fetchFacilities();
  }, []);

  const openModal = (facility) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFacility(null);
    setAvailableSlots([]); // Clear available slots when closing the modal
  };

  const handleDateChange = async (date) => {
    if (selectedFacility) {
      await fetchAvailableSlots(selectedFacility._id, date);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Facilities</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {facilities.length > 0 ? (
          facilities.map((facility) => (
            <div key={facility._id} className="border rounded-lg shadow-lg p-4 bg-white">
              <h2 className="text-xl font-semibold">{facility.facilityname || facility.facilitytype}</h2>
              <p className="text-gray-700">{facility.description || 'No description available'}</p>
              <p className="text-sm text-gray-500">
                {facility.availability ? 'Available' : 'Not Available'}
              </p>
              <button 
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" 
                onClick={() => openModal(facility)} // Open the modal with facility details
              >
                Book Now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No facilities available.</p>
        )}
      </div>
      {isModalOpen && (
        <BookingModal 
          facility={selectedFacility} 
          onClose={closeModal} 
          onDateChange={handleDateChange} // Pass date change handler to the modal
          availableSlots={availableSlots} // Pass available slots to the modal
          user={user} // Pass user info to the modal
        />
      )}
    </div>
  );
};

export default Dashboard;