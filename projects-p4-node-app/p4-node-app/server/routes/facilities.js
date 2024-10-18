// routes/facilities.js
import express from 'express';
import { createFacility, getFacilities, getFacilityById, updateFacility, deleteFacility } from '../controllers/facilityController.js';

const router = express.Router();

// Create a new facility
router.post('/', createFacility);

// Get all facilities
router.get('/', getFacilities);

// Get a facility by ID
router.get('/:id', getFacilityById);

// Update a facility by ID
router.put('/:id', updateFacility);

// Delete a facility by ID
router.delete('/:id', deleteFacility);

export default router;
