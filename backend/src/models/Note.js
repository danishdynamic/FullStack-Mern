import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({  // Define the schema for the Note model
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
}, {timestamps: true}  // This will automatically add createdAt and updatedAt fields to the schema
);

// Create the Note model using the schema and export it
const Note = mongoose.model('Note', noteSchema);

export default Note;