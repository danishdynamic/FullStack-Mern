import Note from '../models/Note.js';

export async function getAllNotes(req, res) {  // instead of req we can use _ if we arent using 
    try {
      const notes = await Note.find().sort({ createdAt: -1 }); // Fetch all notes from the database, sorted by creation date (newest first)
      res.status(200).json(notes); // Send the notes as a JSON response

    } catch (error) {
        console.error('Error fetching notes:', error); 
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function getNoteById(req, res) {
    try{
       const note = await Note.findById(req.params.id); // Fetch a single note by its ID from the database
       if (!note) {
        return res.status(404).json({ message: 'Note not found' }); // If the note is not found, send a 404 response
       }
       res.status(200).json(note); // Send the found note as a JSON response
    }catch (error){
        console.error('Error fetching note by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}


export async function createNote(req, res) {
    try {
      const {title,content} = req.body; // Extract title and content from the request body
        const newNote = new Note({ title, content }); // Create a new Note instance
        await newNote.save(); // Save the new note to the database
        res.status(201).json(newNote); // Send the created note as a JSON response
    } catch (error) {
        console.error('Error creating note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function updateNote(req, res) {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true }); // findbyidandupdate is a mongoose method that finds a document by its ID and updates it with the provided data. The { new: true } option ensures that the updated document is returned.
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export async function deleteNote(req, res) {
    try {
        const { id } = req.params;
        const deletedNote = await Note.findByIdAndDelete(id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully!' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
