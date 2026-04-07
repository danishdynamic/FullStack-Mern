import express from 'express';
import notesRoutes from './routes/notesRoutes.js'; 

// if the "type": "module" is set in package.json, you can use ES6 import syntax or we can use const express = require('express'); if we are using CommonJS syntax.

const app = express();


app.use ("/api/notes", notesRoutes); // Importing the notes routes and using them with the base path /api/notes


app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
 
/* app.get('/api/notes', (req, res) => {
    res.status(200).send('Creating Note...!');  / moving them to router so that we can keep our server.js file clean and organized, and we can easily manage our routes in separate files.
});

app.post('/api/notes', (req, res) => {
    res.status(201).json({'message': 'Note created successfully!'});
});

app.put('/api/notes/:id', (req, res) => {
    res.status(200).json({'message': 'Note updated successfully!'});
});

app.delete('/api/notes/:id', (req, res) => {
    res.status(200).json({'message': 'Note deleted successfully!'});
}); */