const app = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');


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
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});


module.exports = app;