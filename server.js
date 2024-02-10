// Initialize packages 

const express = require ('express');
const path = require('path');
const app = express();
const notes = require('./routes/notes'); // imports feedback router

const PORT = process.env.PORT || 3000; // listen at port 


// Middleware for parsing JSON and urlencoded form data 
app.use(express.json());
app.use(express.urlendcoded( { extended: false} ));

// Middleware to serve up static assets from the public folder
app.use(express.static('public'));

// Send all the requests that begin with /api/notes to the index.js
app.use('/api/notes', notes); // 


// Return notes.html when /notes is called 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

