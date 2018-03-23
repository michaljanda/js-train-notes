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
  if (_.isEmpty(req.query)) {
    res.send(notes);
  } else {
    res.send(_.filter(notes, (n) => {
      let allMatch = true;
      _.forEach(req.query, (value, key) => {
        if (!_.includes(n[key], value)) {
          allMatch = false;
        }
      });
      return allMatch;
    }))
  }
});

app.post('/api/notes/batch-delete', (req, res) => {
  let removedCount = 0;
  _.forEach(req.body, function (id) {
    _.remove(notes, {id: +id}) && removedCount++;
  });
  res.send({removed: removedCount});
});

app.post('/api/notes', (req, res) => {
  let newNote = _.pick(req.body, ['id', 'label', 'text', 'time']);
  notes.push(newNote);
  res.send(newNote);
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
        text: `Some amazing text of note with id ${id}`,
        time: Date.now()
      });
    })(index);
  }
  return toReturn;
}
