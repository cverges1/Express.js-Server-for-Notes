const app = require('express').Router();
const { json } = require('body-parser');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');


app.get('/', (req, res) =>
    readFromFile('./db/db.json').then((data) => {
        return res.json(JSON.parse(data));
    })
);

app.post('/', (req, res) => {
    console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});

//Still experimenting with delete button

// app.delete(`/api/notes/*`, (req, res) => {
//   const noteId = req.params;

//   console.log(noteId);

//   readAndAppend('./db/db.json')
//   .then((data) => JSON.parse(data))
//   .then((json) => {

//     const result = json.filter((note) => note.id !== noteId);

//     readFromFile('./db/db.json', result);

//     res.json(`Note ${noteId} has been deleted 🗑️`);
//   });
// });



module.exports = app;