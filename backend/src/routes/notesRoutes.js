import express from 'express';
import { getAllNotes, getNoteById ,createNote, updateNote, deleteNote  } from '../controllers/notesController.js'; // Importing the controller function for fetching notes
import rateLimiter from '../middleware/rateLimiter.js'; // Import the rate limiter middleware

const router = express.Router();

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', rateLimiter, createNote);
router.put('/:id', rateLimiter, updateNote);
router.delete('/:id', rateLimiter, deleteNote);


export default router;

