
import 'dotenv/config'; // This loads variables IMMEDIATELY before other imports run

import express from 'express';
import notesRoutes from './routes/notesRoutes.js'; 
import connectDB from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js'; // Import the rate limiter middleware

const app = express();
const PORT = process.env.PORT || 5001;



app.use(express.json()); 
// Global Middleware to parse JSON bodies and runs before each route handler i.e app.use() 
// it doesnt directly interacts with routes and controllers.
// express.json() runs first and parses body i.e attaches to req.body inside notesController.js and then the route handler runs and can access req.body.
// app.use(rateLimiter); we can apply ratelimiter globally or better inside routes that modify data (POST, PUT, DELETE) to prevent abuse. Applying globally would also limit GET requests which might not be necessary. So we will apply it inside notesRoutes.js for POST, PUT, DELETE routes.
// our custom middleware to log incoming requests (for debugging purposes)
//app.use((req, res, next) => {
  //console.log (`✅ Request method is ${req.method}, req.url is ${req.url}`);
  //next();
//});

app.use("/api/notes", notesRoutes); // This means that for any request that starts with /api/notes, the notesRoutes will handle it.

// Now this will connect to the database before starting the server. If the connection is successful, it will log a success message. If it fails, it will log the error and exit the process with a failure code. This ensures that the server only starts if the database connection is established successfully, preventing potential issues with handling requests without a database connection.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  });
});