// controllers/facilityController.js
import Facility from '../models/facility.js';

export const createFacility = async (req, res) => {
  const facility = new Facility(req.body);
  try {
    await facility.save();
    res.status(201).send(facility);
  } catch (error) {
    console.error('Error creating facility:', error);
    res.status(400).send({ error: 'Failed to create facility' });
  }
};

export const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    const currentTime = new Date();
    
    const updatedFacilities = facilities.map(facility => {
      // Calculate available time slots for each facility
      const availableSlots = [];
      for (let hour = 8; hour <= 20; hour++) { // Assuming facilities are open from 8 AM to 8 PM
        const timeSlot = `${hour}:00`;
        if (!facility.timeSlots.includes(timeSlot)) {
          availableSlots.push(timeSlot);
        }
      }
      return {
        ...facility.toObject(),
        availableSlots: availableSlots.length // Number of available slots
      };
    });

    res.send(updatedFacilities);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: 'Facility not found' });
    }
    res.send(facility);
  } catch (error) {
    console.error('Error fetching facility:', error);
    res.status(500).send({ error: 'Failed to fetch facility' });
  }
};

export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!facility) {
      return res.status(404).send({ message: 'Facility not found' });
    }
    res.send(facility);
  } catch (error) {
    console.error('Error updating facility:', error);
    res.status(400).send({ error: 'Failed to update facility' });
  }
};

export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findByIdAndDelete(req.params.id);
    if (!facility) {
      return res.status(404).send({ message: 'Facility not found' });
    }
    res.send({ message: 'Facility deleted' });
  } catch (error) {
    console.error('Error deleting facility:', error);
    res.status(500).send({ error: 'Failed to delete facility' });
  }
};
