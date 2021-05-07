// Dependencies
const express = require('express');
const path = require('path');
const fs=require('fs');
var uuid = require('uuid');
var data = fs.readFileSync("./db/db.json");
var myObject= JSON.parse(data);
// Sets up the Express App
const uauid=uuid.v1();
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(express.static(__dirname +`/public`));
// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname,`/public`, '/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname,`/public`, '/notes.html')));

// gets notes/adds new routes
app.get('/api/notes',(req,res) => res.json(myObject))
app.post('/api/notes',(req,res) =>{
    const newnote = req.body
    console.log(newnote)
    myObject.push(newnote)
    
    var newData = JSON.stringify(myObject);
    fs.writeFile("./db/db.json", newData, err => {
        // error checking
        if(err) throw err;
        
        console.log("New data added");
    });   
    res.json(newnote)
})
// // Displays a single character, or returns false
// app.get('/api/characters/:character', (req, res) => {
//   const chosen = req.params.character;

//   console.log(chosen);

//   /* Check each character routeName and see if the same as "chosen"
//    If the statement is true, send the character back as JSON,
//    otherwise tell the user no character was found */

//   for (let i = 0; i < characters.length; i++) {
//     if (chosen === characters[i].routeName) {
//       return res.json(characters[i]);
//     }
//   }

//   return res.json(false);
// });

// Create New Characters - takes in JSON input
// app.post('/api/characters', (req, res) => {
//   // req.body hosts is equal to the JSON post sent from the user
//   // This works because of our body parsing middleware
//   const newCharacter = req.body;

//   // Using a RegEx Pattern to remove spaces from newCharacter
//   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//   newCharacter.routeName = newCharacter.name.replace(/\s+/g, '').toLowerCase();
//   console.log(newCharacter);

//   characters.push(newCharacter);
//   res.json(newCharacter);
// });

// Starts the server to begin listening

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
