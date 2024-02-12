// Import required modules and packages
const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuid = require('uuid');


// Load existing notes from db.JSON file
// Will be let b/c notes will be updated with new entries 
let notes = require('../db/db.json');


// GET route to retrieve all notes 
router.get('/', (req, res) => {
    
    // Logs the notes to the console 
    console.log(notes);
    
    // Respond with JSON containing all the notes 
    res.json(notes);
});


// GET single note from db.JSON based on unique id
router.get('/:id', (req, res) => {

     // Check if there is a note that matches specific id
    const foundNoteData = notes.some(note => note.id === req.params.id);

   // If a matching note is found
    if (foundNoteData) {
        
        // Respond with JSON with the filtered notes array for the ntoes that match specific id
        res.json(notes.filter(note => note.id === req.params.id))
    
    }else{
        // If no matching note is found, respond with a 404 Bad Request status and an error message
        res.status(404).json({ msg: `${req.params.id} not found you bozo`})
    }

});



// Create a new note 
router.post('/', (req, res) => {

    const newNoteData = {

        // Generates a UUID string and take the first 4 characters using splice method as the new ID
        id: uuid.v4().slice(0, 4),
        
        // Get the title property of the requested body
        title: req.body.title,
        
        // Get the text property of the requested body 
        text: req.body.text

    }

    // Check if both title and text properties exist and are truthy in new note data
    if (newNoteData.title && newNoteData.text) {
        // use Push method to add new entry to note object 
        notes.push(newNoteData)

        // Overwrite the existing file with the new data
        fs.writeFile('./db/db.json', JSON.stringify(notes, null, ''), (error) => {
            
            if (error) {
                
                console.error(error);
            
            } else {
               
                console.info('Data updated');
            }
        });
        

        // Send the updated notes as a JSON response 
        res.json(notes);
   
    }else{

        // If title or text properties are missing then send a 404 bad request response 
        res.status(404).json({ msg: 'Hey bozo! Include title and text'});

    }

});


// Delete an existing Note
router.delete('/:id', (req, res) => {
    
    // checks to see if a note with the specified id exists
    const foundNoteData = notes.some(note => note.id === req.params.id);

    if (foundNoteData) {
        
        // Filters out the note with the searched id from the notes array 
        notes = notes.filter(note => note.id !== req.params.id);

        //
        fs.writeFile("./db/db.json", JSON.stringify(notes, null, ''), (error) => {

            if (error) {
                console.error(error)

            }
                
            console.info('notes deleted successfully!')

            })

        // Send the updated notes as a JSON response 
        res.status(200).json(notes);
        }else{
           
           // sends error response 
            res.status(404).json(" note not found bozo ")
        }

    });




module.exports = router;