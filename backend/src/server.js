
import 'dotenv/config'; // This loads variables IMMEDIATELY before other imports run

import express from 'express';
import notesRoutes from './routes/notesRoutes.js'; 
import connectDB from './config/db.js';

const app = express();
const PORT = process.env.PORT || 5001;

// Now this will have access to the URI
connectDB(); 

app.use(express.json()); // Middleware to parse JSON bodies

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});