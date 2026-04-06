import express from 'express'; 

// if the "type": "module" is set in package.json, you can use ES6 import syntax or we can use const express = require('express'); if we are using CommonJS syntax.

const app = express();

app.get('/api/notes', (req, res) => {
    res.send('Hello from the backend!');
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});