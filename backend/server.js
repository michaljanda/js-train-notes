const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const port = 5000;
const app = express();
app.use(bodyParser.json());


const notes = generateInitialNotes(50);

app.get('/api/test', (req, res) => {
  res.send('Test works');
});

app.get('/api/notes/:id', (req, res) => {
  res.send(_.find(notes, {id: +req.params.id}));
});

app.get('/api/notes', (req, res) => {
  res.send(notes);
});

app.post('/api/notes', (req, res) => {
  notes.push(_.pick(req.body, ['id', 'label', 'text']));
});

app.put('/api/notes', (req, res) => {
  let found = _.find(notes, {id: req.body.id});
  _.merge(found, req.body);
  res.send(found);
});

app.delete('/api/notes', (req, res) => {
  res.send(_.remove(notes, {id: +req.query.id}));
});


app.listen(port, () => {
  console.log('listening on port: ', port);
});


function generateInitialNotes(number) {
  const toReturn = [];
  for (let index = 0; index < number; index++) {
    (id => {
      toReturn.push({
        id: index,
        label: `Note ${index} label`,
        text: `Some amazing text of note with id ${index}`,
      });
    })(index);
  }
  return toReturn;
}
